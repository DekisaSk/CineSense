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
    username = sql.Column(sql.String(100))
    email = sql.Column(sql.String(100), unique=True,
                       index=True, nullable=False)
    first_name = sql.Column(sql.String(50), nullable=True)
    last_name = sql.Column(sql.String(50), nullable=True)
    hashed_password = sql.Column(sql.String, nullable=False)
    created_at = sql.Column(sql.DateTime, default=datetime.datetime.now)
    is_disabled = sql.Column(sql.Boolean)

    roles = sql.orm.relationship(
        "Role", secondary=user_roles, back_populates="users")
