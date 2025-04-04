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




class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None
