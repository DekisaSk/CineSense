from fastapi import FastAPI
from apis.auth_routes import router as auth_router
from apis.tmdb_api import router as tmdb_router
from fastapi.middleware.cors import CORSMiddleware
from apis.edit_profile import router as edit_profile_router
from apis.create_user import router as create_user_router
from apis.get_all_users import router as get_all_users_router
from apis.analytics_api import router as analytics_router
from fastapi.staticfiles import StaticFiles
from apis.delete_user import router as delete_user_router
from apis.disable_user import router as disable_user_router
from apis.add_admin import router as add_admin_router
from apis.forgot_password import router as forgot_password_router
from apis.forgot_password import router as reset_password_router
from apis.upload_avatar import router as avatar_router

app = FastAPI()

origins = [
    "http://localhost:5173",
    "https://cinesense.dzuverovic.me",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# app.mount("/static", StaticFiles(directory="static"), name="static")

app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
app.include_router(tmdb_router, tags=["TMDB"])
app.include_router(edit_profile_router, tags=["user_update"])
app.include_router(create_user_router, tags=["create_user"])
app.include_router(get_all_users_router, tags=["create_user"])
app.include_router(analytics_router, tags=["analytics"])
app.include_router(delete_user_router, tags=["delete_user"])
app.include_router(disable_user_router, tags=["disable_user"])
app.include_router(add_admin_router, tags=["add_admin"])
app.include_router(forgot_password_router, tags=["forgot_password"])
app.include_router(reset_password_router, tags=["reset_password"])
app.include_router(avatar_router, tags=["upload_avatar"])


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", port=8000, reload=True)
