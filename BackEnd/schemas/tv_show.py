from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import date

from schemas.genre import Genre


class TVShowBase(BaseModel):
    tmdb_id: int = Field(..., description="The TMDB ID of the TV Show")
    title: Optional[str]
    original_name: Optional[str]
    overview: Optional[str]
    tagline: Optional[str]
    release_date: Optional[date]
    popularity: Optional[float]
    vote_average: Optional[float]
    vote_count: Optional[int]
    poster_path: Optional[str]
    backdrop_path: Optional[str]
    type: Optional[str]


class TVShowRead(TVShowBase):
    genres: List[Genre]

    class Config:
        from_attributes = True
