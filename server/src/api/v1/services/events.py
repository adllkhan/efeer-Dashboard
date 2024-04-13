from typing import List

from aiohttp import ClientSession
from async_lru import alru_cache
from fastapi.responses import JSONResponse
from fastapi import status

from api.v1.core import Config
from api.v1.bot import bot
from api.v1 import repositories


@alru_cache()
async def get_events(
    page: int | None = None,
    limit: int | None = None
) -> List[dict] | JSONResponse:
    params = {"page": page, "limit": limit} if limit and page else None

    async with ClientSession() as session:
        async with session.get(
            url=f"http://{Config().COLLECTOR_HOST}:{Config().COLLECTOR_PORT}/v1/wazuh/events",
            params=params
        ) as response:
            if not response.ok:
                return JSONResponse(
                    content=await response.json(),
                    status_code=response.status
                )
            return await response.json()


@alru_cache()
async def get_event(event_id: str) -> dict:
    params = {"event_id": event_id}

    async with ClientSession() as session:
        async with session.get(
            f"http://{Config().COLLECTOR_HOST}:{Config().COLLECTOR_PORT}/v1/wazuh/event",
            params=params
        ) as response:
            if not response.ok:
                return JSONResponse(
                    content=await response.json(),
                    status_code=response.status
                )
            return await response.json()


# change
def event_to_str(event: dict) -> str:
    text = "New Event detected!\n"
    text += f"Description: {event['rule']['description']}\n"
    text += f"Severity level: {event['rule']['level']}\n\n"
    text += event['timestamp']
    return text


async def send_event(
    event_id: str, agent_id: str
) -> JSONResponse:
    event = await get_event(event_id=event_id)
    if not event:
        return JSONResponse(
            content={"details": "Event not found."},
            status_code=status.HTTP_404_NOT_FOUND
        )

    agent = await repositories.get_agent(agent_id=agent_id)
    if not agent:
        return JSONResponse(
            content={"details": "Agent not found."},
            status_code=status.HTTP_404_NOT_FOUND
        )

    sent = await bot.send_message(
        chat_id=agent.chat_id,
        text=event_to_str(event=event)
    )
    if not sent:
        return JSONResponse(
            content={"details": "Event was not sent."},
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE
        )
    return JSONResponse(
            content={"details": "event sent."},
            status_code=status.HTTP_200_OK
        )
