from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import date
from schemas.genre import Genre

class MovieBase(BaseModel):
    tmdb_id: int = Field(..., description="The TMDB ID of the Movie")
    imdb_id: Optional[str]
    title: Optional[str]
    original_title: Optional[str]
    overview: Optional[str]
    tagline: Optional[str]
    release_date: Optional[date]
    popularity: Optional[float]
    vote_average: Optional[float]
    vote_count: Optional[int]
    poster_path: Optional[str]
    backdrop_path: Optional[str]
    adult: Optional[bool]

class MovieRead(MovieBase):
    genres: List[Genre]

    class Config:
        from_attributes = True