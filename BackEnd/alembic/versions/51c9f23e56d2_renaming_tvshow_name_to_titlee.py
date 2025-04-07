"""renaming tvshow name to titlee

Revision ID: 51c9f23e56d2
Revises: a28ba63878bd
Create Date: 2025-04-07 01:13:24.901042

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '51c9f23e56d2'
down_revision: Union[str, None] = 'a28ba63878bd'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.alter_column(
        table_name='tv_shows',
        column_name='original_name',
        new_column_name='original_title',
        existing_type=sa.Date()  # import sqlalchemy as sql
    )


def downgrade() -> None:
    op.alter_column(
        table_name='tv_shows',
        column_name='original_title',
        new_column_name='original_name',
        existing_type=sa.Date()
    )
