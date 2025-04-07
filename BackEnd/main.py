from fastapi import FastAPI
from apis.auth_routes import router as auth_router
from apis.tmdb_api import router as tmdb_router
from fastapi.middleware.cors import CORSMiddleware
from apis.edit_profile import router as edit_profile_router
from apis.create_user import router as create_user_router

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
app.include_router(tmdb_router, tags=["TMDB"])
app.include_router(edit_profile_router, tags=["user_update"])
app.include_router(create_user_router, tags=["create_user"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", port=8000, reload=True)
