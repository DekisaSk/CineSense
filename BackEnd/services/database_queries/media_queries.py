from typing import Optional

from sqlalchemy import select, extract
from datetime import datetime, timedelta
from sqlalchemy.orm import selectinload
from models.genre import Genre
from models.movie import Movie, movie_genres
from models.tv_show import TVShow, tv_genres

_model_mapping = {"movie": Movie, "tvshow": TVShow}

def _get_media_model(media_type : str):
    model = _model_mapping.get(media_type.lower())

    if model:
       return model
    else:
        raise ValueError("Invalid media type: adequate model could not be found")

def get_popular(media_type : str, limit : int = 10):
    """
    Creates query for popular movies or TV Shows
    :param media_type: represents the media type we want to get - Movies or TV Shows
    :param limit: Set the amount of elements desired to be returned. If omitted, 10 will be retrieved.
    :return: Select query
    """
    model = _get_media_model(media_type)

    query = select(model) \
        .where(model.release_date <= datetime.now()) \
        .order_by(model.popularity.desc()) \
        .limit(limit) \
        .options(selectinload(model.genres))

    return query

def get_top_rated(media_type : str, limit : int = 10):
    """
    Creates query for top-rated Movies or TvShows based on the average vote.
    Time interval is based on the days, set by default to check past week.
    :param media_type: represents the media type we want to get - Movies or TV Shows
    :param limit: Set the amount of elements desired to be returned. If omitted, 10 will be retrieved.
    :return: Select query
    """
    model = _get_media_model(media_type)

    query = select(model) \
        .where(model.release_date <= datetime.now()) \
        .order_by(model.vote_average.desc()) \
        .limit(limit) \
        .options(selectinload(model.genres))

    return query

def get_now_playing(media_type : str, limit : int = 10, days : int = 7):
    """
    Creates query for Movies or TvShows now playing.
    Time interval is based on the days, set by default to check past week.
    :param media_type: represents the media type we want to get - Movies or TV Shows
    :param limit: Set the amount of elements desired to be returned. If omitted, 10 will be retrieved.
    :param days: Set the time interval. If omitted, 7 will be set as default.
    :return: Select query
    """
    time_interval = datetime.now() - timedelta(days=days)

    model = _get_media_model(media_type)

    query = select(model) \
        .where(time_interval <= model.release_date <= datetime.now()) \
        .order_by(model.release_date.desc()) \
        .limit(limit) \
        .options(selectinload(model.genres))

    return query

def get_trending(media_type : str, limit : int = 10, days : int = 7):
    """
    Creates query for Movies or TvShows that are on the rise of popularity in the given time interval.
    Time interval is based on the days, set by default to check past week.
    :param media_type: represents the media type we want to get - Movies or TV Shows
    :param limit: Set the amount of elements desired to be returned. If omitted, 10 will be retrieved.
    :param days: Set the time interval. If omitted, 7 will be set as default.
    :return: Select query
    """
    model = _get_media_model(media_type)
    time_interval = datetime.now() - timedelta(days=days)

    query = select(model) \
        .where(time_interval <= model.release_date <= datetime.now()) \
        .order_by(model.popularity.desc()) \
        .limit(limit) \
        .options(selectinload(model.genres))

    return query

def get_all(media_type : str):
    """
    Creates query for all Movies or TV Shows from the databse
    :param media_type:  represents the media type we want to get - Movies or TV Shows
    :return: Select query
    """
    model = _get_media_model(media_type)
    query = select(model).limit(100).options(selectinload(model.genres))

    return query

def get_genres(media_type : str):
    """
    Creates query for all genres for movies
    :param media_type:  represents the media type we want to get - Movies or TV Shows
    :return: Select query
    """
    model = _get_media_model(media_type)

    query = select(Genre) \
        .where(model.genres.any())

    return query

def get_media(media_type : str, media_id: int):
    """
    Creates query for details about Movie or TvShow based on the media id.
    Time interval is based on the days, set by default to check past week.
    :param media_type: represents the media type we want to get - Movies or TV Shows
    :param media_id: id of the element we are trying to get details about
    :return: Select query
    """
    model = _get_media_model(media_type)

    query = select(model) \
        .where(media_id == model.tmdb_id) \
        .options(selectinload(model.genres))

    return query

def get_all_or_filter(media_type: str, genre: str = None, year: int = None):
    query = get_all(media_type)

    if genre:
        query = query.where(genre == Genre.name)

    if year:
        query = query.where(extract('year', Movie.release_date) == year)

    return query