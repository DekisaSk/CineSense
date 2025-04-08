from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str = "Database URL"
    OPENAI_API_KEY: str = "Open AI API Key"
    model_config = SettingsConfigDict(env_file=".env")
    email_username: str
    email_password: str

settings = Settings()
