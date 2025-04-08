from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from datetime import datetime, timedelta, timezone
from pydantic import BaseModel
from models.user import User
from dependecies.db import get_db
from schemas.user import UserInDB
from services.auth import get_user
from utils.email_utils import send_reset_email
import jwt

router = APIRouter()

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

@router.post("/forgot-password")
async def forgot_password(email: str, db: AsyncSession = Depends(get_db)):
    user = await get_user(db, email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    token_data = {
        "sub": user.email,
        "exp": datetime.now(timezone.utc) + timedelta(minutes=30),
    }
    token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)

    reset_link = f"http://localhost:5173/reset-password?token={token}"
    await send_reset_email(user.email, reset_link)

    return {"message": "Reset link sent to your email"}



class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str

@router.post("/reset-password")
async def reset_password(
    data: ResetPasswordRequest,
    db: AsyncSession = Depends(get_db)
):
    try:
        payload = jwt.decode(data.token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if not email:
            raise HTTPException(status_code=400, detail="Invalid token")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=400, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=400, detail="Invalid token")

    result = await db.execute(select(User).where(User.email == email))
    user = result.scalar_one_or_none()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    from services.auth import get_password_hash  
    user.hashed_password = get_password_hash(data.new_password)

    await db.commit()
    return {"message": "Password successfully reset"}

@router.get("/reset-password")
async def open_reset_page(token: str):
    return {"message": "Token received", "token": token}