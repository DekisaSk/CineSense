from fastapi import Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from services.auth import get_current_active_user
from schemas.user import UserInDB
from dependecies.db import get_db

class SessionChecker:
    def __init__(self, db: AsyncSession = Depends(get_db), current_user: UserInDB = Depends(get_current_active_user)):
        self.current_user = current_user

    def check_permissions(self, required_permissions: list[str]):
        user_permissions = self.current_user.permissions
        if not any(permission in user_permissions for permission in required_permissions):
            raise HTTPException(
                status_code=403,
                detail="You do not have the necessary permissions"
            )
