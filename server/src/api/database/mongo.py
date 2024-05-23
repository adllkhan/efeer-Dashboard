from motor.motor_asyncio import AsyncIOMotorClient

from api.core import DatabaseConfig

client = AsyncIOMotorClient(DatabaseConfig().URL)

database = client["efeer"]

events_collection = database["events"]
agents_collection = database["agents"]
