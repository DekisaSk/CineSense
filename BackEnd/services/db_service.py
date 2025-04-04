from typing import Optional
from fastapi import Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import IntegrityError
from models.genre import Genre
from models.movie import Movie
from models.tv_show import TVShow
from models.user import User
from schemas.user import UserCreate, UserInDB
from models.role import Role
from dependecies.db import get_db
from services.database_queries.media_queries import (
    get_all,
    get_genres,
    get_now_playing,
    get_popular,
    get_top_rated,
    get_trending
)


async def get_role_by_id(role_id : int, db: AsyncSession = Depends(get_db)) -> Role:
    """
    Retrieves the role that matches the role_id
    :param db: Database async session
    :param role_id: Role ID to be found
    :return: List of Role objects
    """
    result = await db.execute(select(Role).where(Role.id == role_id))
    return result.scalars().first()

async def create_user( user: UserCreate,
                       db: AsyncSession = Depends(get_db)) -> User:
    """
    Inserts new user in User table
    :param user: User to be created
    :param db: DB Session
    :return: Newly created User
    """
    new_user = User(
        username=user.username,
        email=user.email,
        hashed_password=user.password,
    )
    role = await get_role_by_id(user.role_id, db)

    if role:
        new_user.roles.append(role)
        db.add(new_user)
        try:
            await db.commit()
            await db.refresh(new_user)
        except IntegrityError as ex:
            await db.rollback()
            raise ValueError("User with this username or email already exists.")
        return new_user
    else:
        raise ValueError("Role ID does not exist.")

async def get_user_by_id(user_id: int, db: AsyncSession = Depends(get_db)) -> Optional[User]:
    """
        Query's DB to retrieve user based on the user's ID
        :return: returns the user
    """
    result = await db.execute(select(User).where(User.id == user_id))
    return result.scalars().first()

async def get_user_by_username( username: str, db: AsyncSession = Depends(get_db)):
    """
        Query's DB to retrieve user based on the username
        :return: returns the user
    """
    result = await db.execute(select(User).where(User.username == username))
    return result.scalars().first()

def update_user(user: UserInDB, db: AsyncSession = Depends(get_db)):
    """
    Change the user's information by updating data in DB
    :param user: User with updated information
    :param db: Async DB Session
    :return: Updated User or None if the user does not exist
    """
    # db_user = db.execute(select(User).where(User.id == user).first()
    # if db_user:
    #     db_user.username = user.username
    #     db_user.email = user.email
    #     db_user.password = user.password  # Hash the password before storing
    #     db.commit()
    #     db.refresh(db_user)
    #     return db_user
    # return None
    pass

async def delete_user( user_id : int, db: AsyncSession = Depends(get_db)):
    """
    Removes the user from the User table
    :param user_id: User to be removed
    :param db: Async DB Session
    :return: removed User if successful, else None
    """
    user = await get_user_by_id(user_id, db)
    if user:
        await db.delete(user)
        await db.commit()
        return user
    return None

async def get_popular_movies(limit : int = 10, db: AsyncSession = Depends(get_db)) -> list[Movie]:
    return await get_popular(media_type="movie", db=db, limit=limit)

async def get_popular_tv_shows(limit : int = 10, db: AsyncSession = Depends(get_db)) -> list[TVShow]:
    return await get_popular(media_type="tv", db=db, limit=limit)

async def get_top_rated_movies(limit : int = 10, db: AsyncSession = Depends(get_db)) -> list[Movie]:
    return await get_top_rated(media_type="movie", db=db, limit=limit)

async def get_top_rated_tv_shows(limit : int = 10, db: AsyncSession = Depends(get_db)) -> list[TVShow]:
    return await get_top_rated(media_type="tv", db=db, limit=limit)

async def get_now_playing_movies(limit : int = 10, db: AsyncSession = Depends(get_db))-> list[Movie]:
    return await get_now_playing(media_type="movie", db=db, limit=limit)

async def get_now_playing_tv_shows(limit : int = 10, db: AsyncSession = Depends(get_db)) -> list[TVShow]:
    return await get_now_playing(media_type="tv", db=db, limit=limit)

async def get_all_movies(db: AsyncSession = Depends(get_db)) -> list[Movie]:
    return await get_all(media_type="movie", db=db)

async def get_all_tv_shows(db: AsyncSession = Depends(get_db)) -> list[TVShow]:
    return await get_all(media_type="tv", db=db)

async def get_trending_movies(db: AsyncSession = Depends(get_db)) -> list[Movie]:
    return await get_trending(media_type="movie", db=db)

async def get_trending_tv_shows(db: AsyncSession = Depends(get_db)) -> list[TVShow]:
    return await get_trending(media_type="tv", db=db)

async def get_movie_genres(db: AsyncSession = Depends(get_db)) -> list[Genre]:
     return await get_genres(media_type="movie",db=db)

async def get_tv_show_genres(db: AsyncSession = Depends(get_db)) -> list[Genre]:
    return await get_genres(media_type="tv",db=db)
