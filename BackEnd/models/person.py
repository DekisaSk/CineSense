import sqlalchemy as sql
from dependecies.db import Base


class Person(Base):
    __tablename__ = 'persons'
    # TMDB person ID
    person_id = sql.Column(sql.Integer, primary_key=True)
    name = sql.Column(sql.String(255), nullable=False)
    profile_path = sql.Column(sql.String(255))
