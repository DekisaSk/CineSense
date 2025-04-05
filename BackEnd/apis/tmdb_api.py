from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from dependecies.db import get_db
import services.db_service as db_service
from schemas.tv_show import TVShowRead
from schemas.movie import MovieRead

router = APIRouter()

@router.get("/movies", status_code=status.HTTP_200_OK, response_model=List[MovieRead])
async def get_all_movies(db: AsyncSession = Depends(get_db)):
    try:
        return await db_service.get_all_movies(db)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.get("/tv-shows", status_code=status.HTTP_200_OK, response_model=List[TVShowRead])
async def get_all_tv_shows(db: AsyncSession = Depends(get_db)):
    try:
        return await db_service.get_all_tv_shows(db)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.get("/movies/popular", status_code=status.HTTP_200_OK, response_model=List[MovieRead])
async def get_popular_movies(db: AsyncSession = Depends(get_db)):
    try:
        return await db_service.get_popular_movies(db)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.get("/tv-shows/popular", status_code=status.HTTP_200_OK, response_model=List[TVShowRead])
async def get_popular_tv_shows(db: AsyncSession = Depends(get_db)):
    try:
        return await db_service.get_popular_tv_shows(db)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.get("/movies/top", status_code=status.HTTP_200_OK, response_model=List[MovieRead])
async def get_top_rated_movies(db: AsyncSession = Depends(get_db)):
    try:
        return await db_service.get_top_rated_movies(db)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.get("/tv-shows/top", status_code=status.HTTP_200_OK, response_model=List[TVShowRead])
async def get_top_rated_tv_shows(db: AsyncSession = Depends(get_db)):
    try:
        return await db_service.get_top_rated_tv_shows(db)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.get("/movies/now-playing", status_code=status.HTTP_200_OK, response_model=List[MovieRead])
async def get_now_playing_movies(db: AsyncSession = Depends(get_db)):
    try:
        return await db_service.get_now_playing_movies(db)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.get("/tv-shows/now-playing", status_code=status.HTTP_200_OK, response_model=List[TVShowRead])
async def get_now_playing_tv_shows(db: AsyncSession = Depends(get_db)):
    try:
        return await db_service.get_now_playing_tv_shows(db)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.get("/movies/trending", status_code=status.HTTP_200_OK, response_model=List[MovieRead])
async def get_trending_movies(db: AsyncSession = Depends(get_db)):
    try:
        return await db_service.get_trending_movies(db)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.get("/tv-shows/trending", status_code=status.HTTP_200_OK, response_model=List[TVShowRead])
async def get_trending_tv_shows(db: AsyncSession = Depends(get_db)):
    try:
        return await db_service.get_trending_tv_shows(db)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.get("/movies/genres", status_code=status.HTTP_200_OK, response_model=List[MovieRead])
async def get_movie_genres(db: AsyncSession = Depends(get_db)):
    try:
        return await db_service.get_movie_genres(db)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.get("/tv-shows/genres", status_code=status.HTTP_200_OK, response_model=List[TVShowRead])
async def get_tv_show_genres(db: AsyncSession = Depends(get_db)):
    try:
        return await db_service.get_tv_show_genres(db)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.get("/movies/{movie_id}", status_code=status.HTTP_200_OK, response_model=List[MovieRead])
async def get_movie_details(movie_id: int, db: AsyncSession = Depends(get_db)):
    try:
        return await db_service.get_movie_details(movie_id, db)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.get("/tv-shows/{tv_id}", status_code=status.HTTP_200_OK, response_model=List[TVShowRead])
async def get_tv_show_details(tv_id: int ,db: AsyncSession = Depends(get_db)):
    try:
        return await db_service.get_tv_show_details(tv_id, db)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))