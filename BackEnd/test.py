from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy.future import select

# Postavite vašu konekciju (zamenite sa vašim podacima)
DATABASE_URL = "postgresql+asyncpg://admin:dzuver@45.155.126.141:5432/cinesense_db"

# Kreirajte asinkroni engine
engine = create_async_engine(DATABASE_URL, echo=True)

# Kreirajte sesiju
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

# Test funkcija za konekciju
async def test_connection():
    async with engine.begin() as conn:  # Kreira konekciju
        result = await conn.execute(select(1))  # Jednostavan upit koji uvek daje rezultat
        print("Konekcija uspešna!")
        print(result.scalar())  # Trebalo bi da ispiše 1

# Pokretanje testa
import asyncio
asyncio.run(test_connection())
