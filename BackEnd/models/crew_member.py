import sqlalchemy as sql
from database import Base


class CrewMember(Base):
    __tablename__ = 'crew_members'

    credit_id = sql.Column(sql.String(100), sql.ForeignKey(
        'credits.credit_id'), primary_key=True)  # shared
    person_id = sql.Column(sql.Integer, sql.ForeignKey(
        'persons.person_id'), nullable=False)
    department = sql.Column(sql.String(100))
    job = sql.Column(sql.String(100))

    person = sql.orm.relationship("Person")
    credit = sql.orm.relationship("Credit")
