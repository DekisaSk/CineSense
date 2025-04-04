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

@router.get("/popular-movies", status_code=status.HTTP_200_OK, response_model=List[MovieRead])
async def get_popular_movies(db: AsyncSession = Depends(get_db)):
    try:
        return await db_service.get_popular_movies(db)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.get("/popular-tv-shows", status_code=status.HTTP_200_OK, response_model=List[TVShowRead])
async def get_popular_tv_shows(db: AsyncSession = Depends(get_db)):
    try:
        return await db_service.get_popular_tv_shows(db)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.get("/top-movies", status_code=status.HTTP_200_OK, response_model=List[MovieRead])
async def get_top_rated_movies(db: AsyncSession = Depends(get_db)):
    try:
        return await db_service.get_top_rated_movies(db)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.get("/top-tv-shows", status_code=status.HTTP_200_OK, response_model=List[TVShowRead])
async def get_top_rated_tv_shows(db: AsyncSession = Depends(get_db)):
    try:
        return await db_service.get_top_rated_tv_shows(db)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))