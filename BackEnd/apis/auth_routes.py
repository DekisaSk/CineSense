from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from schemas.user import Token
from services.auth import authenticate_user, create_access_token
from datetime import timedelta
from sqlalchemy.ext.asyncio import AsyncSession
from dependecies.db import get_db
from services.session_checker import SessionChecker
from core.config import settings

ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES

router = APIRouter()


@router.post("/token", response_model=Token)
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: AsyncSession = Depends(get_db)
):
    user = await authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=400,
            detail="Incorrect username or password",
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires)
    return Token(access_token=access_token, token_type="bearer")


@router.get("/user-info")
async def user_info(session: SessionChecker = Depends()):
    return {
        "email": session.current_user.email,
        "role": session.current_user.role,
        "name": session.current_user.first_name,
        "last_name": session.current_user.last_name,
        "is_disabled": session.current_user.is_disabled
    }


@router.get("/check-authorisation")
async def is_autorised(session: SessionChecker = Depends()):
    if session.check_access_by_role("user"):
        return {"access": True}


@router.get("/admin-access")
async def is_autorised(session: SessionChecker = Depends()):
    if session.check_access_by_role("admin"):
        return {"access": True}
