import math
from uuid import uuid4

from fastapi.exceptions import HTTPException
from fastapi import status

from api.repositories import AgentsCRUD
from api.database import agents_collection
from api.schemas import (
    AgentOut, AgentsInfo, AgentIn, AgentsOut, Agent,
    BotTokenDelete, BotTokenOut
)


class AgentsService:
    def __init__(self):
        self.crud = AgentsCRUD(collection=agents_collection)

    async def get_agents(
        self,
        page: int = None,
        limit: int = None,
    ) -> AgentsOut:
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
        agents = await self.crud.get()
        if not agents:
            raise HTTPException(
                detail={"msg": "No agents found."},
                status_code=status.HTTP_404_NOT_FOUND,
            )
        agents = [AgentOut(**agent) for agent in agents]
        if limit is None or limit <= 0:
            return AgentsOut(agents=agents)
        pages = len(agents) / limit
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
        total = len(agents)
        agents = agents[start:end]
        return AgentsOut(
            agents=agents, info=AgentsInfo(
                pages=pages, total=total, limit=limit
            )
        )

    async def get_agent(self, agent_id: str) -> Agent:
        agent = await self.crud.get_one(_id=agent_id)
        if not agent:
            raise HTTPException(
                detail={"msg": "Agent not found."},
                status_code=status.HTTP_404_NOT_FOUND,
            )
        return Agent(**agent)

    async def get_agent_by_token(self, token: str | None) -> Agent:
        if not token:
            raise HTTPException(
                detail={"msg": "Token is invalid."},
                status_code=status.HTTP_404_NOT_FOUND,
            )
        agent = await self.crud.get_one_by_token(token=token)
        if not agent:
            raise HTTPException(
                detail={"msg": "Agent not found."},
                status_code=status.HTTP_404_NOT_FOUND,
            )
        return Agent(**agent)

    async def create_token(self, agent: AgentIn) -> BotTokenOut:
        agent = await self.get_agent(agent_id=agent.id)
        if not agent:
            raise HTTPException(
                detail={"msg": "Agent not found."},
                status_code=status.HTTP_404_NOT_FOUND,
            )
        if agent.chat_id or agent.token:
            raise HTTPException(
                detail={
                    "msg": "Agent is already registered or already has access token."
                },
                status_code=status.HTTP_400_BAD_REQUEST,
            )
        token = str(uuid4())
        agent.token = token
        await self.crud.update(object=agent.model_dump())
        return BotTokenOut(token=token)

    async def delete_token(self, token: BotTokenDelete) -> BotTokenOut:
        agent = await self.get_agent(agent_id=token.agent_id)
        if not agent:
            raise HTTPException(
                detail={"msg": "Agent not found."},
                status_code=status.HTTP_404_NOT_FOUND,
            )
        if not agent.token:
            raise HTTPException(
                detail={"msg": "Agent does not have token."},
                status_code=status.HTTP_400_BAD_REQUEST,
            )
        if agent.token != token.token:
            raise HTTPException(
                detail={"msg": "Incorrect token."},
                status_code=status.HTTP_400_BAD_REQUEST,
            )
        token = BotTokenOut(token=agent.token)
        agent.token = None
        agent.chat_id = None
        await self.crud.update(agent.model_dump())
        return token
