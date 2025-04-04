import sqlalchemy as sql
from database import Base


class Favorite(Base):
    __tablename__ = 'favorites'

    # TMDB global credit_id
    user_id = sql.Column(sql.Integer, nullable=False, primary_key=True)
    # TMDB movie or TV show ID
    content_id = sql.Column(sql.Integer, nullable=False, primary_key=True)
    content_type = sql.Column(sql.String(
        10), primary_key=True, nullable=False)  # 'movie' or 'tv'
