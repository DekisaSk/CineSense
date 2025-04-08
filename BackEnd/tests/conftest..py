from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import AsyncSession
import pytest
from dependecies.db import get_db, AsyncSessionLocal
from main import app


@pytest.fixture(scope="function")
async def db_session() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        yield session


@pytest.fixture(scope="function", autouse=True)
def override_get_db(db_session):
    async def _override() -> AsyncGenerator[AsyncSession, None]:
        yield db_session
    app.dependency_overrides[get_db] = _override
