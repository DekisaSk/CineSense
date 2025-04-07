from fastapi import APIRouter, Depends
from services.db_service import delete_user
from dependecies.db import get_db
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()


@router.delete("/delete-user/{user_id}")
async def delete_user_by_id(user_id: int, db: AsyncSession = Depends(get_db)):
    try:
        deleted_user = await delete_user(user_id, db)
        if deleted_user:
            return {"message": f"User deleted: {deleted_user.email}"}
        return {"message": "User not found"}
    except Exception as e:
        print("Error deleting user:", e)
        return {"message": "Failed deleting the user"}