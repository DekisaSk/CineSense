from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from fastapi import Depends

DATABASE_URL = "postgresql+asyncpg://admin:dzuver@45.155.126.141:5432/cinesense_db"

engine = create_async_engine(DATABASE_URL, echo=True)
AsyncSessionLocal = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)


async def get_db():
    print("CONNECTED--------------------->>>>>")
    db = AsyncSessionLocal()
    try:
        yield db
    finally:
       await db.close()
