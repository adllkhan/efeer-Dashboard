from .events import EventsCRUD


class AgentsCRUD(EventsCRUD):
    def __init__(self, collection):
        super().__init__(collection)

    async def get_one_by_token(self, token: str) -> dict:
        return await self.collection.find_one({"token": token})

    async def update(self,  object: dict) -> dict:
        object = await self.collection.update_one(
            {"_id": object["id"]},
            {"$set": object},
        )
        return object
