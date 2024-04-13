from sqlalchemy import String, BigInteger
from sqlalchemy.orm import mapped_column

from api.v1.database import Base


class Agent(Base):
    __tablename__ = "agents"

    id = mapped_column(String, primary_key=True)
    token = mapped_column(String, unique=True)
    chat_id = mapped_column(BigInteger, nullable=True, unique=True)
