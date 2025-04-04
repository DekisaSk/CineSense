from models.role import Role
import datetime
import sqlalchemy as sql
from dependecies.db import Base

# Konekcione
user_roles = sql.Table(
    'user_roles', Base.metadata,
    sql.Column('user_id', sql.ForeignKey('users.id'), primary_key=True),
    sql.Column('role_id', sql.ForeignKey('roles.id'), primary_key=True)
)


# Povezana na role preko user_roles
class User(Base):
    __tablename__ = 'users'

    id = sql.Column(sql.Integer, primary_key=True, index=True)
    username = sql.Column(sql.String(100), unique=True,
                          index=True, nullable=False)
    email = sql.Column(sql.String(100), unique=True,
                       index=True, nullable=False)
    hashed_password = sql.Column(sql.String, nullable=False)
    created_at = sql.Column(sql.DateTime, default=datetime.datetime.now)

    roles = sql.orm.relationship(
        "Role", secondary=user_roles, back_populates="users")
