from fastapi import APIRouter

from api.services import AgentsService
from api.schemas import (
    AgentsOut, AgentIn, Agent,
    BotTokenOut, BotTokenDelete
)


router = APIRouter(prefix="/agents")
services = AgentsService()


@router.get(
    path="",
    description="Get all agents.",
    response_model=AgentsOut
)
async def get_agents(page: int = None, limit: int = None) -> AgentsOut:
    return await services.get_agents(page=page, limit=limit)


@router.post(
    path="/token",
    description="Create token for Agent to register in Telegram Bot.",
    response_model=BotTokenOut
)
async def create_token(agent: AgentIn) -> BotTokenOut:
    return await services.create_token(agent=agent)


@router.delete(
    path="/token",
    description="Delete Agent's token.",
    response_model=BotTokenOut
)
async def delete_token(token: BotTokenDelete) -> BotTokenOut:
    return await services.delete_token(token=token)


@router.get(
    path="/{agent_id}",
    description="Get agent by id.",
    response_model=Agent
)
async def get_agent(agent_id: str) -> Agent:
    return await services.get_agent(agent_id=agent_id)
