from fastapi import FastAPI
from apis.auth_routes import router as auth_router
from apis.tmdb_api import router as tmdb_router

app = FastAPI()

app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
app.include_router(tmdb_router, tags=["TMDB"])


