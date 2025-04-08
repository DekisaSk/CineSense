from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from schemas.user import UserCreate
from services.db_service import get_all_users
from dependecies.db import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from services.session_checker import SessionChecker

router = APIRouter()

@router.get("/get-all-users", status_code=status.HTTP_200_OK)
async def fetch_all_users(
    db: AsyncSession = Depends(get_db),
    session: SessionChecker = Depends()
):
    if not session.check_access_by_role("admin"):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorised")

    users = await get_all_users(db)
    return users