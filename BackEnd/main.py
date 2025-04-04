from fastapi import FastAPI
from apis.auth_routes import router as auth_router

app = FastAPI()

app.include_router(auth_router, prefix="/auth", tags=["Authentication"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", port=8000, reload=True)
