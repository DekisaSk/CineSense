from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from fastapi import Depends

DATABASE_URL = "mysql+aiomysql://root:mikivolikiki@localhost:3306/homework"

engine = create_async_engine(DATABASE_URL, echo=True)
AsyncSessionLocal = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)


def get_db():
    db = AsyncSessionLocal()
    try:
        yield db
    finally:
        db.close()
