from fastapi import APIRouter, Depends, HTTPException, status
from services.db_service import delete_user
from dependecies.db import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from services.session_checker import SessionChecker

router = APIRouter()


@router.delete("/delete-user/{user_id}", status_code=status.HTTP_200_OK)
async def delete_user_by_id(
    user_id: int,
    db: AsyncSession = Depends(get_db),
    session: SessionChecker = Depends()
):
    if not session.check_access_by_role("admin"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorised"
        )

    deleted_user = await delete_user(user_id, db)

    if not deleted_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id {user_id} not found"
        )

    return {"message": f"User deleted: {deleted_user.email}"}