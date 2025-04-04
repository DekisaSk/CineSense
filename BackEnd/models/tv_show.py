import sqlalchemy as sql
from dependecies.db import Base

tv_genres = sql.Table(
    'tv_genres', Base.metadata,
    sql.Column('tmdb_id', sql.ForeignKey(
        'tv_shows.tmdb_id'), primary_key=True),
    sql.Column('genre_id', sql.ForeignKey('genres.genre_id'), primary_key=True)
)


class TVShow(Base):
    __tablename__ = 'tv_shows'
    tmdb_id = sql.Column(sql.Integer, primary_key=True, nullable=False)
    name = sql.Column(sql.String(255))
    original_name = sql.Column(sql.String(255))
    overview = sql.Column(sql.Text)
    tagline = sql.Column(sql.String(255))
    first_air_date = sql.Column(sql.Date)
    popularity = sql.Column(sql.Float)
    vote_average = sql.Column(sql.Float)
    vote_count = sql.Column(sql.Integer)
    poster_path = sql.Column(sql.String(255))
    backdrop_path = sql.Column(sql.String(255))
    type = sql.Column(sql.String(100))

    genres = sql.orm.relationship(
        'Genre', secondary=tv_genres, backref='tv_shows')
