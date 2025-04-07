import sqlalchemy as sql
from dependecies.db import Base

movie_genres = sql.Table(
    'movie_genres', Base.metadata,
    sql.Column('tmdb_id', sql.ForeignKey('movies.tmdb_id'), primary_key=True),
    sql.Column('genre_id', sql.ForeignKey('genres.genre_id'), primary_key=True)
)

# Possible future update to display cast and crew of a movie
# movie_credits = sql.Table(
#     'movie_credits', Base.metadata,
#     sql.Column('tmdb_id', sql.ForeignKey(
#         'movies.tmdb_id'), primary_key=True),
#     sql.Column('credit_id', sql.ForeignKey(
#         'credits.credit_id'), primary_key=True)
# )


class Movie(Base):
    __tablename__ = 'movies'

    tmdb_id = sql.Column(sql.Integer, primary_key=True, nullable=False)
    imdb_id = sql.Column(sql.String(20))
    title = sql.Column(sql.Text)
    original_title = sql.Column(sql.Text)
    overview = sql.Column(sql.Text)
    tagline = sql.Column(sql.Text)
    release_date = sql.Column(sql.Date)
    popularity = sql.Column(sql.Float)
    vote_average = sql.Column(sql.Float)
    vote_count = sql.Column(sql.Integer)
    poster_path = sql.Column(sql.String(255))
    backdrop_path = sql.Column(sql.String(255))
    adult = sql.Column(sql.Boolean)

    genres = sql.orm.relationship(
        'Genre', secondary=movie_genres, back_populates='movies')
    # credits = sql.orm.relationship(
    #     'Credit', secondary=movie_credits, back_populates='movies')
