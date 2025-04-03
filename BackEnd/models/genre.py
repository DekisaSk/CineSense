import sqlalchemy as sql
from database import Base


class Genre(Base):
    __tablename__ = 'genres'
    genre_id = sql.Column(sql.Integer, primary_key=True)
    name = sql.Column(sql.String(100), nullable=False)
