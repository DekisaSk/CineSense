from fastapi import FastAPI
from apis.auth_routes import router as auth_router
from apis.tmdb_api import router as tmdb_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Add the client origin (where the React app runs)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)
app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
app.include_router(tmdb_router, tags=["TMDB"])


