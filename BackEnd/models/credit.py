import sqlalchemy as sql
from dependecies.db import Base


class Credit(Base):
    __tablename__ = 'credits'

    # TMDB global credit_id
    credit_id = sql.Column(sql.String(100), primary_key=True)
    # TMDB movie or TV show ID
    content_id = sql.Column(sql.Integer, nullable=False)
    content_type = sql.Column(sql.String(
        10), nullable=False)  # 'movie' or 'tv'

    # tv_shows = sql.orm.relationship(
    #     'TVShow', secondary="tv_credits", back_populates='credits')
    # movies = sql.orm.relationship(
    #     'Movie', secondary="movie_credits", back_populates='credits')
