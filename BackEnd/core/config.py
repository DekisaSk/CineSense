from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str = "Database URL"
    OPENAI_API_KEY: str = "Open AI API Key"
    GA4_PROPERTY_ID: str = "GA4 Property ID"
    SECRET_KEY: str = "Secret Key"
    ALGORITHM: str = "Algorithm"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    email_username: str
    email_password: str
    ADMIN_USERNAME: str
    ADMIN_PASSWORD: str

    model_config = SettingsConfigDict(env_file=".env")


settings = Settings()
