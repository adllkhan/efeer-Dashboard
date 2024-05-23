from fastapi import APIRouter, Request

from api.services import EventsService
from api.schemas import Message


router = APIRouter(prefix="/events")
services = EventsService()


@router.get(
    path="",
    description="Get all events."
)
async def get_events(
    page: int | None = None,
    limit: int | None = None
) -> dict | list[dict]:
    return await services.get_events(page=page, limit=limit)


@router.post(
    path="",
    description="Wazuh webhook. sends events to efeer.",
)
async def post_event(request: Request) -> dict:
    event = await services.add_event(await request.json())
    return event


@router.post(
    path="/send",
    description="Send event to agent's telegram."
)
async def send_event(message: Message) -> dict:
    return await services.send_event(
        event_id=message.event_id,
        agent_id=message.agent_id
    )


@router.get(
    path="/{event_id}",
    description="Get event by id."
)
async def get_event(event_id: str) -> dict:
    return await services.get_event(event_id=event_id)
