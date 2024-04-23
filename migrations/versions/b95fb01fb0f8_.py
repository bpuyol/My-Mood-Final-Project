"""empty message

Revision ID: b95fb01fb0f8
Revises: b957ddffa548
Create Date: 2024-04-23 20:08:48.948698

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b95fb01fb0f8'
down_revision = 'b957ddffa548'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('mood', schema=None) as batch_op:
        batch_op.add_column(sa.Column('response', sa.String(length=255), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('mood', schema=None) as batch_op:
        batch_op.drop_column('response')

    # ### end Alembic commands ###
