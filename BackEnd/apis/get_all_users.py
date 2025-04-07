from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from schemas.user import UserCreate
from services.db_service import get_all_users
from dependecies.db import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from dependecies.session import SessionChecker

router = APIRouter()

@router.get("/get-all-users")
async def fetch_all_users(db: AsyncSession = Depends(get_db), session: SessionChecker = Depends()):
    try:
        print("Before permission check")
        result = session.check_permissions("admin")
        print("After permission check:", result)
        
        users = await get_all_users(db)
        print("Fetched users:", users)
        
        return users
    except Exception as e:
        print("Exception caught:", repr(e))
        return {"message": "Not authorised"}