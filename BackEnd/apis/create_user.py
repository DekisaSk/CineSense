from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from schemas.user import UserCreate
from services.db_service import create_user
from dependecies.db import get_db
from sqlalchemy.ext.asyncio import AsyncSession


router = APIRouter()

@router.post("/register")
async def register_user(user_data: UserCreate, db: AsyncSession = Depends(get_db)):
    return await create_user(user_data, db)

    