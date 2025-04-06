import sqlalchemy as sql
from dependecies.db import Base


class Genre(Base):
    __tablename__ = 'genres'
    genre_id = sql.Column(sql.Integer, primary_key=True)
    name = sql.Column(sql.String(100), nullable=False)

    tv_shows = sql.orm.relationship(
        'TVShow', secondary="tv_genres", back_populates='genres')
    movies = sql.orm.relationship(
        'Movie', secondary="movie_genres", back_populates='genres')
