from pydantic import BaseModel

class GenreBase(BaseModel):
    genre_id: int
    name: str

class Genre(GenreBase):
    class Config:
        from_attributes = True