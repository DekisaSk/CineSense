from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from models.role import Role
from dependecies.db import get_db
from services.db_service import get_user_by_email
from sqlalchemy import select
from models.user import User
from sqlalchemy.orm import selectinload

router = APIRouter()

@router.put("/add-admin/{email}")
async def set_admin_role(email: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(User)
        .options(selectinload(User.roles))
        .where(User.email == email)
    )
    user = result.scalars().first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    result = await db.execute(select(Role).where(Role.name == "admin"))
    admin_role = result.scalars().first()

    if not admin_role:
        raise HTTPException(status_code=404, detail="Admin role not found")

    user.roles = [admin_role]

    await db.commit()
    await db.refresh(user)

    return {"message": f"{user.email} role set to admin"}