from fastapi import APIRouter, Depends, HTTPException
from dependecies.db import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from models.user import User

router = APIRouter()


@router.put("/disable-user/{user_id}")
async def disable_user(user_id: int, db: AsyncSession = Depends(get_db)):
    user = await db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if user.is_disabled:
        message = "enabled"
    else:
        message = "disabled"
    user.is_disabled = not user.is_disabled    
    await db.commit()
    return {"message": f"User {message} "}
