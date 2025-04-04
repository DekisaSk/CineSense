from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    database_url: str = "Database URL"

    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()
