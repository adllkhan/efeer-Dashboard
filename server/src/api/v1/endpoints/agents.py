from fastapi import APIRouter

from api.v1 import services
from api.v1 import schemas


router = APIRouter()


@router.get("/agents", response_model=list[schemas.Agent])
async def get_agents(limit: int | None = None):
    return await services.get_agents(limit=limit)


@router.get("/agent", response_model=schemas.Agent)
async def get_agent(agent_id: str):
    return await services.get_agent(agent_id=agent_id)
