from pydantic import BaseModel
from typing import List, Optional

class UserBase(BaseModel):
    username: str
    first_name: str
    last_name: str
    email: str
    role_id: int
    disabled: bool

class UserCreate(UserBase):
    password: str

class UserInDB(UserBase):
    hashed_password: str
    permissions: List[str]

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
