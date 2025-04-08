from pydantic import BaseModel, EmailStr
from typing import Optional


class UserBase(BaseModel):
    id: int
    # username: str
    # to be changed to str once the db is updated
    first_name: Optional[str] = None
    # to be changed to str once the db is updated
    last_name: Optional[str] = None
    email: str
    role_id: int
    is_disabled: bool | None  # to be changed to bool once the db is updated


class UserCreate(BaseModel):
    # to be changed to str once the db is updated
    first_name: Optional[str] = None
    # to be changed to str once the db is updated
    last_name: Optional[str] = None
    email: str
    password: str


class UserInDB(UserBase):
    hashed_password: str
    role: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None


class UserToUpdate(BaseModel):
    first_name: str
    last_name: str
    email: str


class AllUsers(BaseModel):
    first_name: str
    last_name: str
    email: str
    is_disabled: Optional[bool] = None

    class Config:
        from_attributes = True
