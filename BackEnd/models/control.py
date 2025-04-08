import sqlalchemy as sql
from dependecies.db import Base


class Control(Base):
    __tablename__ = 'controls'

    name = sql.Column(sql.String(100), primary_key=True)
    is_enabled = sql.Column(sql.Boolean)
