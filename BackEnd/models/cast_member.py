import sqlalchemy as sql
from dependecies.db import Base


class CastMember(Base):
    __tablename__ = 'cast_members'

    credit_id = sql.Column(sql.String(100), sql.ForeignKey(
        'credits.credit_id'), primary_key=True)  # shared
    person_id = sql.Column(sql.Integer, sql.ForeignKey(
        'persons.person_id'), nullable=False)
    character = sql.Column(sql.String(255))
    order = sql.Column(sql.Integer)

    person = sql.orm.relationship("Person")
    credit = sql.orm.relationship("Credit")
