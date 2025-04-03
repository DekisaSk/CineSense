from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    tmdb_api_key: str = "Api Key"

    model_config = SettingsConfigDict(env_file=".env_design")

@lru_cache
def get_settings():
    return Settings()
