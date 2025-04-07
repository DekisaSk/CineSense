from typing import List, Optional
from fastapi import APIRouter, Depends, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from dependecies.db import get_db
import services.db_service as db_service
from schemas.tv_show import TVShowRead
from schemas.movie import MovieRead
from schemas.genre import Genre
from services.session_checker import SessionChecker

router = APIRouter()

@router.get("/movies",
            status_code=status.HTTP_200_OK,
            response_model=List[MovieRead],
            summary="Get all movies or filter them by genre, release year and/or title")
async def get_all_movies(genre_id: Optional[int] = Query(None, description="Filter by genre"),
                         year: Optional[int] = Query(
                             None, description="Filter by release year"),
                         title: Optional[str] = Query(None, description="Filter by movie title"),
                         db: AsyncSession = Depends(get_db)):
    return await db_service.get_movies(genre_id=genre_id, year=year, title=title, db=db)


@router.get("/tv-shows",
            status_code=status.HTTP_200_OK,
            response_model=List[TVShowRead],
            summary="Get all TV Shows or filter them by genre, release year and/or title")
async def get_all_tv_shows(genre_id: Optional[int] = Query(None, description="Filter by genre"),
                           year: Optional[int] = Query(
                               None, description="Filter by release year"),
                           title: Optional[str] = Query(None, description="Filter by movie title"),
                           db: AsyncSession = Depends(get_db)):
    return await db_service.get_tv_shows(genre_id=genre_id, year=year, title=title, db=db)


@router.get("/movies/popular",
            status_code=status.HTTP_200_OK,
            response_model=List[MovieRead],
            summary="Get Movies that are popular")
async def get_popular_movies(db: AsyncSession = Depends(get_db)):
    return await db_service.get_popular_movies(db)


@router.get("/tv-shows/popular",
            status_code=status.HTTP_200_OK,
            response_model=List[TVShowRead],
            summary="Get Tv Shows that are popular")
async def get_popular_tv_shows(db: AsyncSession = Depends(get_db)):
    return await db_service.get_popular_tv_shows(db)


@router.get("/movies/top",
            status_code=status.HTTP_200_OK,
            response_model=List[MovieRead],
            summary="Get top rated Movies")
async def get_top_rated_movies(db: AsyncSession = Depends(get_db)):
    return await db_service.get_top_rated_movies(db)


@router.get("/tv-shows/top",
            status_code=status.HTTP_200_OK,
            response_model=List[TVShowRead],
            summary="Get top rated TV Shows")
async def get_top_rated_tv_shows(db: AsyncSession = Depends(get_db)):
    return await db_service.get_top_rated_tv_shows(db)


@router.get("/movies/now-playing",
            status_code=status.HTTP_200_OK,
            response_model=List[MovieRead],
            summary="Get Movies that have been recently released")
async def get_now_playing_movies(db: AsyncSession = Depends(get_db)):
    return await db_service.get_now_playing_movies(db)


@router.get("/tv-shows/now-playing",
            status_code=status.HTTP_200_OK,
            response_model=List[TVShowRead],
            summary="Get Tv Shows that have been recently released")
async def get_now_playing_tv_shows(db: AsyncSession = Depends(get_db)):
    return await db_service.get_now_playing_tv_shows(db)


@router.get("/movies/trending",
            status_code=status.HTTP_200_OK,
            response_model=List[MovieRead],
            summary="Get Movies that are lately on the rise of popularity")
async def get_trending_movies(db: AsyncSession = Depends(get_db)):
    return await db_service.get_trending_movies(db)


@router.get("/tv-shows/trending",
            status_code=status.HTTP_200_OK,
            response_model=List[TVShowRead],
            summary="Get Tv Shows that are lately on the rise of popularity")
async def get_trending_tv_shows(db: AsyncSession = Depends(get_db)):
    return await db_service.get_trending_tv_shows(db)


@router.get("/movies/smart-search/{query}",
            summary="Movies Smart search based on natural language",
            response_model=List[MovieRead],
            status_code=200)
async def smart_search(query: str,
                       db: AsyncSession = Depends(get_db)):
    return await db_service.get_smart_movies_recommendations(query, db)


@router.get("/tv-shows/smart-search/{query}",
            summary="TV Smart search based on natural language",
            response_model=List[TVShowRead],
            status_code=200)
async def smart_search(query: str,
                       db: AsyncSession = Depends(get_db)):
    return await db_service.get_smart_tv_shows_recommendations(query, db)


@router.get("/movies/genres",
            status_code=status.HTTP_200_OK,
            response_model=List[Genre],
            summary="Get all the Genres of Movies")
async def get_movie_genres(db: AsyncSession = Depends(get_db)):
    return await db_service.get_movie_genres(db)


@router.get("/tv-shows/genres",
            status_code=status.HTTP_200_OK,
            response_model=List[Genre],
            summary="Get all the Genres of Tv Shows")
async def get_tv_show_genres(db: AsyncSession = Depends(get_db)):
    return await db_service.get_tv_show_genres(db)


@router.get("/movies/favorite",
            status_code=status.HTTP_200_OK,
            response_model=List[MovieRead],
            summary="Get User's favorite movies")
async def get_user_favorite_movies(db: AsyncSession = Depends(get_db),
    session_checker: SessionChecker = Depends()):
    user_id = session_checker.current_user.id
    return await db_service.get_user_favorite_movies(user_id=user_id, db=db)


@router.get("/tv-shows/favorite",
            status_code=status.HTTP_200_OK,
            response_model=List[TVShowRead],
            summary="Get User's favorite tv shows")
async def get_user_favorite_tv_shows(db: AsyncSession = Depends(get_db),
    session_checker: SessionChecker = Depends()):
    user_id = session_checker.current_user.id
    return await db_service.get_user_favorite_tv_shows(user_id=user_id, db=db)


@router.post("/movies/favorite/{movie_id}",
            status_code=status.HTTP_201_CREATED,
            summary="Adds Movie to user's favorites")
async def add_favorite_movie(movie_id: int,
                                db: AsyncSession = Depends(get_db),
                                session_checker: SessionChecker = Depends()):
    user_id = session_checker.current_user.id
    return await db_service.add_favorite_movie(user_id=user_id, movie_id=movie_id, db=db)


@router.post("/tv-shows/favorite/{tv_id}",
            status_code=status.HTTP_201_CREATED,
            summary="Adds TV Show to user's favorites")
async def add_favorite_tv_show(tv_id: int,
                                db: AsyncSession = Depends(get_db),
                                session_checker: SessionChecker = Depends()):
    user_id = session_checker.current_user.id
    return await db_service.add_favorite_tv_show(user_id=user_id, tv_id=tv_id, db=db)


@router.delete("/movies/favorite/{movie_id}",
            status_code=status.HTTP_200_OK,
            summary="Removes Movie from user's favorites")
async def remove_favorite_movie(movie_id: int,
                                db: AsyncSession = Depends(get_db),
                                session_checker: SessionChecker = Depends()):
    user_id = session_checker.current_user.id
    return await db_service.remove_favorite_movie(user_id=user_id, movie_id=movie_id, db=db)


@router.delete("/tv-shows/favorite/{tv_id}",
            status_code=status.HTTP_200_OK,
            summary="Removes TV Show from user's favorites")
async def remove_favorite_tv_show(tv_id: int,
                                db: AsyncSession = Depends(get_db),
                                session_checker: SessionChecker = Depends()):
    user_id = session_checker.current_user.id
    return await db_service.remove_favorite_tv_show(user_id=user_id, tv_id=tv_id, db=db)


@router.get("/movies/favorite/{movie_id}",
            status_code=status.HTTP_200_OK,
            summary="Checks if Movie is user's favorite")
async def is_movie_favorite(movie_id: int,
                                db: AsyncSession = Depends(get_db),
                                session_checker: SessionChecker = Depends()):
    user_id = session_checker.current_user.id
    return await db_service.is_movie_favorite(user_id=user_id, movie_id=movie_id, db=db)


@router.get("/tv-shows/favorite/{tv_id}",
            status_code=status.HTTP_200_OK,
            summary="Checks if TV Show is user's favorite")
async def is_tv_show_favorite(tv_id: int,
                                db: AsyncSession = Depends(get_db),
                                session_checker: SessionChecker = Depends()):
    user_id = session_checker.current_user.id
    return await db_service.is_tv_show_favorite(user_id=user_id, tv_id=tv_id, db=db)


@router.get("/movies/{movie_id}",
            status_code=status.HTTP_200_OK,
            response_model=MovieRead,
            summary="Get Movie by its id")
async def get_movie_details(movie_id: int, db: AsyncSession = Depends(get_db)):
    return await db_service.get_movie_details(movie_id, db)


@router.get("/tv-shows/{tv_id}",
            status_code=status.HTTP_200_OK,
            response_model=TVShowRead,
            summary="Get Tv Show by its id")
async def get_tv_show_details(tv_id: int, db: AsyncSession = Depends(get_db)):
    return await db_service.get_tv_show_details(tv_id, db)