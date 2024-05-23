import math

from fastapi.exceptions import HTTPException
from fastapi import status
from aiogram.types import FSInputFile

from api.bot import bot
from api.repositories import EventsCRUD, AgentsCRUD
from api.database import events_collection, agents_collection
from .report import ReportService


class EventsService:
    def __init__(self):
        self.events_crud = EventsCRUD(collection=events_collection)
        self.agents_crud = AgentsCRUD(collection=agents_collection)
        self.report_service = ReportService()

    async def get_events(
        self,
        page: int = None,
        limit: int = None,
    ) -> dict:
        if page is None:
            page = 0
        else:
            page -= 1
        if page < 0:
            raise HTTPException(
                detail={
                    "msg": "The requested page number must be greater than 0."
                },
                status_code=status.HTTP_400_BAD_REQUEST,
            )
        events = await self.events_crud.get()
        if not events:
            raise HTTPException(
                detail={"msg": "No events found."},
                status_code=status.HTTP_404_NOT_FOUND,
            )
        if limit is None or limit <= 0:
            return events
        pages = len(events) / limit
        pages = math.ceil(pages)
        if page + 1 > pages:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail={
                    "msg": "The requested page number is greater than the number of existing pages.",
                    "requested": page + 1,
                    "exists": pages,
                },
            )
        start = page * limit
        end = start + limit
        events_length = len(events)
        events = events[start:end]
        events = {
            "info": {"pages": pages, "total": events_length, "limit": limit},
            "events": events,
        }
        return events

    async def get_event(self, event_id: str) -> dict:
        event = await self.events_crud.get_one(_id=event_id)
        if not event:
            raise HTTPException(
                detail={"msg": "Event not found."},
                status_code=status.HTTP_404_NOT_FOUND,
            )
        return event

    async def add_event(self, event: dict) -> dict:
        agent = {**event["agent"], "chat_id": None, "token": None}
        event = await self.events_crud.create(object=event)
        if not (await self.agents_crud.get_one(_id=agent["id"])):
            await self.agents_crud.create(object=agent)
        return event

    async def send_event(self, event_id: str, agent_id: str) -> dict:
        event = await self.get_event(event_id=event_id)
        if not event:
            raise HTTPException(
                detail={"msg": "Event not found."},
                status_code=status.HTTP_404_NOT_FOUND,
            )
        agent = await self.agents_crud.get_one(_id=agent_id)
        if not agent:
            raise HTTPException(
                detail={"msg": "Agent not found."},
                status_code=status.HTTP_404_NOT_FOUND,
            )
        if not agent["chat_id"]:
            raise HTTPException(
                detail={"msg": "Agent is not registered"},
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        pdf_path = self.report_service.render_pdf(event=event)
        caption = self.report_service.render_caption(event=event)

        pdf = FSInputFile(path=pdf_path)
        response = await bot.send_document(
            chat_id=agent["chat_id"],
            document=pdf,
            caption=caption
        )
        if not response:
            raise HTTPException(
                detail="Event was not sent.",
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            )
        return {"msg": "Event sent."}
