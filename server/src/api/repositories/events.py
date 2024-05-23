import json
from bson import json_util

from motor.motor_asyncio import AsyncIOMotorCollection


class EventsCRUD:
    def __init__(self, collection: AsyncIOMotorCollection) -> None:
        self.collection = collection

    async def get(self) -> list[dict]:
        objects = await self.collection.find().to_list(length=None)
        return json.loads(json_util.dumps(objects))

    async def get_one(self, _id: str) -> dict:
        object = await self.collection.find_one({"_id": _id})
        return json.loads(json_util.dumps(object))

    async def create(self, object: dict) -> dict:
        object["_id"] = object["id"]
        object.pop("id")
        object = await self.collection.insert_one(document=object)
        return await self.collection.find_one({"_id": object.inserted_id})
