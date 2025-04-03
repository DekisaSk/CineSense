import sqlalchemy as sql
from database import Base


class Credit(Base):
    __tablename__ = 'credits'

    # TMDB global credit_id
    credit_id = sql.Column(sql.String(100), primary_key=True)
    # TMDB movie or TV show ID
    content_id = sql.Column(sql.Integer, nullable=False)
    content_type = sql.Column(sql.String(
        10), nullable=False)  # 'movie' or 'tv'

    __table_args__ = (sql.UniqueConstraint(
        'content_id', 'content_type', name='_content_uc'),)
