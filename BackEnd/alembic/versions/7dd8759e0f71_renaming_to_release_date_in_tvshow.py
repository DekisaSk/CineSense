"""renaming to release date in TVShow

Revision ID: 7dd8759e0f71
Revises: 07b6205bce99
Create Date: 2025-04-05 13:51:47.722772

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '7dd8759e0f71'
down_revision: Union[str, None] = '07b6205bce99'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.alter_column(
        table_name='tv_shows',
        column_name='first_air_date',
        new_column_name='release_date',
        existing_type=sa.Date()  # import sqlalchemy as sql
    )


def downgrade() -> None:
    op.alter_column(
        table_name='tv_shows',
        column_name='release_date',
        new_column_name='first_air_date',
        existing_type=sa.Date()
    )
