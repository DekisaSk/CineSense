from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from dependecies.db import get_db
from services.control_service import toggle_control
from services.session_checker import SessionChecker

router = APIRouter()


@router.put("/controls/{name}")
async def update_control(
    name: str,
    value: bool,
    db: AsyncSession = Depends(get_db),
    session: SessionChecker = Depends()
):
    if not session.check_access_by_role("admin"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Not authorised")

    return await toggle_control(name, value, db)
