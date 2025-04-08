from fastapi import APIRouter, Depends, HTTPException, status
from services.session_checker import SessionChecker
from schemas.user import UserToUpdate
from models.user import User
from services.db_service import get_user_by_id, update_user
from dependecies.db import get_db
from sqlalchemy.ext.asyncio import AsyncSession


router = APIRouter()

@router.put('/update-user-info')
async def update_user_info(
    user_info: UserToUpdate,
    session: AsyncSession = Depends(get_db),
    session_checker: SessionChecker = Depends()
):
    if not session.check_permissions("user"):
        raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="Not authorised"
    )
    current_user = session_checker.current_user
    user = await get_user_by_id(current_user.id, session)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    updated_user = await update_user(user, user_info, session)
    return {"message": "User info updated successfully", "user": updated_user}
