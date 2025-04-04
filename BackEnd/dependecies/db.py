from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from core.config import settings

DATABASE_URL = settings.database_url

engine = create_async_engine(DATABASE_URL, echo=True)
# noinspection PyTypeChecker
AsyncSessionLocal = sessionmaker( autocommit=False,
                                  autoflush=False,
                                  bind=engine,
                                  class_=AsyncSession,
                                  expire_on_commit=False)

def get_db():
    db = AsyncSessionLocal()
    try:
        yield db
    finally:
        db.close()

Base = declarative_base()