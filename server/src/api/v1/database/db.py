from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.ext.asyncio import (
    create_async_engine,
    async_sessionmaker,
    AsyncAttrs,
)

from api.v1.core import Config

engine = create_async_engine(url=Config().DATABASE_URL, echo=True)

SessionLocal = async_sessionmaker(bind=engine)


class Base(AsyncAttrs, DeclarativeBase):
    pass


async def init():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
