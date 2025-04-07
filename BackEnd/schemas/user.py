from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    id: int
    # username: str
    first_name: Optional[str] = None #to be changed to str once the db is updated
    last_name: Optional[str] = None #to be changed to str once the db is updated
    email: str
    role_id: int
    disabled: bool | None #to be changed to bool once the db is updated

class UserCreate(BaseModel):
    first_name: Optional[str] = None #to be changed to str once the db is updated
    last_name: Optional[str] = None #to be changed to str once the db is updated
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



