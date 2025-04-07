from typing import List, Optional
from fastapi import Depends, HTTPException
from sqlalchemy import select, Select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import IntegrityError, NoResultFound, DBAPIError
from starlette import status
from services.openai_service import get_tmdb_ids_from_description
from models.genre import Genre
from models.movie import Movie
from models.tv_show import TVShow
from models.user import User
from schemas.user import UserCreate, UserInDB, UserToUpdate, AllUsers
from models.role import Role
from dependecies.db import get_db
from services.database_queries.media_queries import (
    get_genres,
    get_items_by_tmdb_ids,
    get_now_playing,
    get_popular,
    get_top_rated,
    get_trending, get_media, get_all_or_filter
)
from services.auth import get_password_hash



async def get_all_users(db: AsyncSession = Depends(get_db)) -> List[AllUsers]:
    result = await db.execute(select(User))
    users = result.scalars().all()
    return list(map(AllUsers.model_validate, users))

async def get_role_by_id(role_id: int, db: AsyncSession = Depends(get_db)) -> Role:
    """
    Retrieves the role that matches the role_id
    :param db: Database async session
    :param role_id: Role ID to be found
    :return: List of Role objects
    """
    result = await db.execute(select(Role).where(Role.id == role_id))
    return result.scalars().first()


async def create_user(user: UserCreate,
                      db: AsyncSession = Depends(get_db)) -> User:
    """
    Inserts new user in User table
    :param user: User to be created
    :param db: DB Session
    :return: Newly created User
    """
    result = await db.execute(select(Role).where(Role.name == "user"))
    role = result.scalars().first()

    if not role:
        raise ValueError("Default role 'user' does not exist.")

    new_user = User(
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        username="proba",#to be removed!!!!
        hashed_password=get_password_hash(user.password),
        is_disabled=False
    )

    new_user.roles.append(role) 

    db.add(new_user)
    try:
        await db.commit()
        await db.refresh(new_user)
        return new_user
    except IntegrityError:
        await db.rollback()
        raise ValueError("User with this username or email already exists.")

async def get_user_by_id(user_id: int, db: AsyncSession = Depends(get_db)) -> Optional[User]:
    """
        Query's DB to retrieve user based on the user's ID
        :return: returns the user
    """
    result = await db.execute(select(User).where(User.id == user_id))
    return result.scalars().first()


async def get_user_by_username(username: str, db: AsyncSession = Depends(get_db)):
    """
        Query's DB to retrieve user based on the username
        :return: returns the user
    """
    result = await db.execute(select(User).where(User.username == username))
    return result.scalars().first()


async def get_user_by_email(email: str, db: AsyncSession = Depends(get_db)):
    """
        Query's DB to retrieve user based on the email
        :return: returns the user
    """
    result = await db.execute(select(User).filter(User.email == email))
    return result.scalars().first()

async def update_user(user: UserInDB, user_info: UserToUpdate, db: AsyncSession = Depends(get_db)):
    """
    Change the user's information by updating data in DB
    :param user: User with updated information
    :param db: Async DB Session
    :return: Updated User or None if the user does not exist
    """
    # Ensure to await db.execute() properly and then use scalars().first() to get the result
    result = await db.execute(select(User).where(User.id == user.id))
    db_user = result.scalars().first()  # Use scalars().first() to get the first result

    if db_user:
        db_user.first_name = user_info.first_name
        db_user.last_name = user_info.last_name
        db_user.email = user_info.email
        await db.commit()  # Use await for asynchronous commit
        await db.refresh(db_user)  # Use await for asynchronous refresh
        return db_user
    return None


async def delete_user(user_id: int, db: AsyncSession = Depends(get_db)):
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


async def get_popular_movies(db: AsyncSession) -> list[Movie]:
    query = get_popular(media_type=Movie.__name__)
    return await _execute_all(db, query)


async def get_popular_tv_shows(db: AsyncSession) -> list[TVShow]:
    query = get_popular(media_type=TVShow.__name__)
    return await _execute_all(db, query)


async def get_top_rated_movies(db: AsyncSession) -> list[Movie]:
    query = get_top_rated(media_type=Movie.__name__)
    return await _execute_all(db, query)


async def get_top_rated_tv_shows(db: AsyncSession) -> list[TVShow]:
    query = get_top_rated(media_type=TVShow.__name__)
    return await _execute_all(db, query)


async def get_now_playing_movies(db: AsyncSession) -> list[Movie]:
    query = get_now_playing(media_type=Movie.__name__)
    return await _execute_all(db, query)


async def get_now_playing_tv_shows(db: AsyncSession) -> list[TVShow]:
    query = get_now_playing(media_type=TVShow.__name__)
    return await _execute_all(db, query)


async def get_movies(db: AsyncSession, genre_id: int = None, year: int = None, title: str = None) -> list[Movie]:
    query = get_all_or_filter(
        media_type=Movie.__name__, genre_id=genre_id, year=year, title=title)
    return await _execute_all(db, query)


async def get_tv_shows(db: AsyncSession, genre_id: str = None, year: int = None, title: str = None) -> list[TVShow]:
    query = get_all_or_filter(
        media_type=TVShow.__name__, genre_id=genre_id, year=year, title=title)
    return await _execute_all(db, query)


async def get_trending_movies(db: AsyncSession) -> list[Movie]:
    query = get_trending(media_type=Movie.__name__)
    return await _execute_all(db, query)


async def get_trending_tv_shows(db: AsyncSession) -> list[TVShow]:
    query = get_trending(media_type=TVShow.__name__)
    return await _execute_all(db, query)


async def get_smart_movies_recommendations(description: str, db: AsyncSession):
    titles = await get_tmdb_ids_from_description(media_type=Movie.__name__, description=description)

    query = get_items_by_tmdb_ids(media_type=Movie.__name__, titles=titles)
    return await _execute_all(db, query)


async def get_smart_tv_shows_recommendations(description: str, db: AsyncSession):
    titles = await get_tmdb_ids_from_description(media_type=TVShow.__name__, description=description)

    query = get_items_by_tmdb_ids(media_type=TVShow.__name__, titles=titles)
    return await _execute_all(db, query)


async def get_movie_genres(db: AsyncSession) -> list[Genre]:
    query = get_genres(media_type=Movie.__name__)
    return await _execute_all(db, query)


async def get_tv_show_genres(db: AsyncSession) -> list[Genre]:
    query = get_genres(media_type=TVShow.__name__)
    return await _execute_all(db, query)


async def get_movie_details(media_id: int, db: AsyncSession) -> Movie:
    query = get_media(media_type=Movie.__name__, media_id=media_id)
    return await _execute_one(db, query)


async def get_tv_show_details(media_id: int, db: AsyncSession) -> TVShow:
    query = get_media(media_type=TVShow.__name__, media_id=media_id)
    return await _execute_one(db, query)


async def _execute_all(db: AsyncSession, query: Select[tuple[Movie | TVShow | Genre]]):
    try:
        result = await db.execute(query)
        return list(result.scalars().all())
    except DBAPIError as dbe:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=str(dbe))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


async def _execute_one(db: AsyncSession, query: Select[tuple[Movie | TVShow]]):
    try:
        result = await db.execute(query)
        return result.scalars().first()
    except NoResultFound as nr:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=str(nr))
    except DBAPIError as dbe:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=str(dbe))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
