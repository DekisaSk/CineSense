from fastapi import Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from services.auth import get_current_active_user
from schemas.user import UserInDB
from dependecies.db import get_db

class SessionChecker():
    def __init__(self, db: AsyncSession = Depends(get_db), current_user: UserInDB = Depends(get_current_active_user)):
        self.current_user = current_user
        self.db = db
    def check_access_by_role(self, required_role: str):
        user_role = self.current_user.role
        if user_role == 'admin':
            return True
        if user_role != required_role:
            raise HTTPException(
                status_code=403,
                detail="You do not have the necessary permissions"
            )
        return True

