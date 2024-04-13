from fastapi import APIRouter

from api.v1 import services, schemas

router = APIRouter(prefix="/events")


@router.get("")
async def get_events(page: int | None = None, limit: int | None = None):
    return await services.get_events(page=page, limit=limit)


@router.post("/send")
async def send_event(message: schemas.Message):
    return await services.send_event(
        event_id=message.event_id,
        agent_id=message.agent_id
    )


@router.get("/{event_id}")
async def get_event(event_id: str):
    return await services.get_event(event_id=event_id)
