from datetime import datetime
from typing import List
import uvicorn
from pydantic import BaseModel
from fastapi import HTTPException, Depends, Header
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
import fastapi
from datetime import datetime, timedelta, timezone
from typing import Annotated
import jwt
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jwt.exceptions import InvalidTokenError
from passlib.context import CryptContext

import asyncio
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy.future import select
from sqlalchemy import MetaData, Integer, String, Column
from sqlalchemy.orm import declarative_base
from dependecies.db import get_db
from schemas.user import UserInDB
from services.auth import get_current_active_user


class SessionChecker:
    def __init__(self, 
                 current_user: UserInDB = Depends(get_current_active_user),
                 db: AsyncSession = Depends(get_db)):
        self.current_user = current_user
        self.db = db

    def check_permissions(self, required_permission: str):
        if self.current_user.role == "admin":
            return True
        if (self.current_user.role != required_permission):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have the necessary permissions"
            )
        return True