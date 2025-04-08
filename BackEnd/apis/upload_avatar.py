from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from models.user import User
from dependecies.db import get_db
import os
import uuid
from fastapi.responses import FileResponse
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from services.session_checker import SessionChecker



router = APIRouter()

UPLOAD_DIR = "static/avatars"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload-avatar")
async def upload_avatar(
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db),
    session: SessionChecker = Depends(),
):
    if not session.check_access_by_role("user"):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorised")

    current_user_email = session.current_user.email

    result = await db.execute(select(User).where(User.email == current_user_email))
    user = result.scalar_one_or_none()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Invalid file type")

    filename = f"{uuid.uuid4().hex}_{file.filename}"
    file_path = os.path.join(UPLOAD_DIR, filename)

    os.makedirs(UPLOAD_DIR, exist_ok=True)

    with open(file_path, "wb") as f:
        f.write(await file.read())

    relative_path = f"/static/avatars/{filename}"
    user.avatar_path = relative_path

    await db.commit()
    await db.refresh(user)

    return {"message": "Avatar uploaded successfully", "avatar_url": relative_path}


