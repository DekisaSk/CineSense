import sqlalchemy as sql
from database import Base


class Role(Base):
    __tablename__ = 'roles'

    id = sql.Column(sql.Integer, primary_key=True, index=True)
    name = sql.Column(sql.String(100), unique=True, nullable=False)
    permissions = sql.Column(sql.String(100), nullable=True)
    users = sql.orm.relationship(
        "User", secondary="user_roles", back_populates="roles")
