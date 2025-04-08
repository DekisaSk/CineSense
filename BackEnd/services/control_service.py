from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from models.control import Control
from fastapi import HTTPException, status


async def is_enabled(name: str, db: AsyncSession) -> bool:
    result = await db.execute(select(Control).where(Control.name == name))
    control = result.scalar_one_or_none()
    if control is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Control '{name}' not found in the database."
        )
    return control.is_enabled


async def toggle_control(name: str, value: bool, db: AsyncSession) -> dict:
    result = await db.execute(select(Control).where(Control.name == name))
    control = result.scalar_one_or_none()

    if control is None:
        raise HTTPException(
            status_code=404, detail=f"Control '{name}' not found")

    control.is_enabled = value
    await db.commit()
    await db.refresh(control)

    return {"message": f"{name} set to {value}", "control": {"name": name, "is_enabled": value}}
