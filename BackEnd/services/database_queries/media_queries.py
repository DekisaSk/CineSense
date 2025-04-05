from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime, timedelta

from sqlalchemy.orm import selectinload

from models.genre import Genre
from models.movie import Movie, movie_genres
from models.tv_show import TVShow, tv_genres

_model_mapping = {"movie": Movie, "tvshow": TVShow}
_association_mapping = {"movie" : movie_genres, "tvshow" : tv_genres}

def _get_media_model(media_type : str):
    model = _model_mapping.get(media_type.lower())

    if model:
       return model
    else:
        raise ValueError("Invalid media type: adequate model could not be found")

def _get_association_table(media_type : str):
    association_table = _association_mapping.get(media_type.lower())

    if association_table:
       return association_table
    else:
        raise ValueError("Invalid media type: adequate association table could not be found")

async def get_popular(media_type : str, db: AsyncSession, limit : int = 10):
    """
    Retrieves popular movies or TV Shows
    :param media_type: represents the media type we want to get - Movies or TV Shows
    :param db: Async DB Session
    :param limit: Set the amount of elements desired to be returned. If omitted, 10 will be retrieved.
    :return: A list of Movies or TV Shows
    """
    model = _get_media_model(media_type)

    query = select(model) \
        .where(model.release_date <= datetime.now()) \
        .order_by(model.popularity.desc()) \
        .limit(limit) \
        .options(selectinload(model.genres))

    result = await db.execute(query)

    return list(result.scalars().all())

async def get_top_rated(media_type : str, db: AsyncSession, limit : int = 10):
    """
    Retrieves top-rated Movies or TvShows based on the average vote.
    Time interval is based on the days, set by default to check past week.
    :param media_type: represents the media type we want to get - Movies or TV Shows
    :param db: Async DB Session
    :param limit: Set the amount of elements desired to be returned. If omitted, 10 will be retrieved.
    :return: list of top-rated elements
    """
    model = _get_media_model(media_type)

    query = select(model) \
        .where(model.release_date <= datetime.now()) \
        .order_by(model.vote_average.desc()) \
        .limit(limit) \
        .options(selectinload(model.genres))

    result = await db.execute(query)

    return list(result.scalars().all())

async def get_now_playing(media_type : str, db: AsyncSession, limit : int = 10, days : int = 7):
    """
    Retrieves Movies or TvShows now playing.
    Time interval is based on the days, set by default to check past week.
    :param media_type: represents the media type we want to get - Movies or TV Shows
    :param db: Async DB Session
    :param limit: Set the amount of elements desired to be returned. If omitted, 10 will be retrieved.
    :param days: Set the time interval. If omitted, 7 will be set as default.
    :return: list of elements playing in the set time interval.
    """
    time_interval = datetime.now() - timedelta(days=days)

    model = _get_media_model(media_type)

    query = select(model) \
        .where(time_interval <= model.release_date <= datetime.now()) \
        .order_by(model.release_date.desc()) \
        .limit(limit) \
        .options(selectinload(model.genres))

    result = await db.execute(query)

    return result.scalars().all()

async def get_trending(media_type : str, db: AsyncSession, limit : int = 10, days : int = 7):
    """
    Retrieves Movies or TvShows that are on the rise of popularity in the given time interval.
    Time interval is based on the days, set by default to check past week.
    :param media_type: represents the media type we want to get - Movies or TV Shows
    :param db: Async DB Session
    :param limit: Set the amount of elements desired to be returned. If omitted, 10 will be retrieved.
    :param days: Set the time interval. If omitted, 7 will be set as default.
    :return: list of trending elements.
    """
    model = _get_media_model(media_type)
    time_interval = datetime.now() - timedelta(days=days)

    query = select(model) \
        .where(time_interval <= model.release_date <= datetime.now()) \
        .order_by(model.popularity.desc()) \
        .limit(limit) \
        .options(selectinload(model.genres))

    result = await db.execute(query)

    return list(result.scalars().all())

async def get_all(media_type : str, db: AsyncSession):
    """
    Retrieves all Movies or TV Shows from the database
    :param db: Async DB Session
    :param media_type:  represents the media type we want to get - Movies or TV Shows
    :return: A list of elements
    """
    model = _get_media_model(media_type)

    result = await db.execute(select(model).options(selectinload(model.genres)))
    return list(result.scalars().all())

async def get_genres(media_type : str, db: AsyncSession) -> list[Genre]:
    """
    Retrieves all genres for movies
    :param db: Async DB Session
    :param media_type:  represents the media type we want to get - Movies or TV Shows
    :return: A list of genres
    """
    model = _get_media_model(media_type)
    association_table = _get_association_table(media_type)

    query = select(Genre) \
        .join(association_table, Genre.genre_id == association_table.c.genre_id) \
        .join(model, model.tmdb_id == movie_genres.c.tmdb_id)

    result = await db.execute(query)

    return list(result.scalars().all())

async def get_media(media_type : str, media_id: int, db: AsyncSession):
    """
    Retrieves details about Movie or TvShow based on the media id.
    Time interval is based on the days, set by default to check past week.
    :param media_type: represents the media type we want to get - Movies or TV Shows
    :param media_id: id of the element we are trying to get details about
    :param db: Async DB Session
    :return:
    """
    model = _get_media_model(media_type)

    query = select(model) \
        .where(media_id == model.tmdb_id) \
        .options(selectinload(model.genres))

    result = await db.execute(query)
    return result.scalars().first()