from typing import List

from sqlalchemy import select

from api.v1.models import Agent
from api.v1.database import SessionLocal


async def get_agents() -> List[Agent]:
    async with SessionLocal() as db:
        stmt = select(Agent)
        res = await db.execute(statement=stmt)
        return list(res.scalars().all())


async def get_agent(agent_id: str) -> Agent:
    async with SessionLocal() as db:
        return await db.get(entity=Agent, ident=agent_id)


async def get_agent_by_token(token: str) -> Agent:
    async with SessionLocal() as db:
        stmt = select(Agent).where(Agent.token == token)
        res = await db.execute(statement=stmt)
        return res.scalars().first()


async def create_agent(agent: Agent) -> Agent:
    async with SessionLocal() as db:
        db.add(instance=agent)
        await db.commit()
        await db.refresh(instance=agent)
        return agent


async def update_agent(agent: Agent) -> Agent:
    async with SessionLocal() as db:
        await db.merge(instance=agent)
        await db.commit()
        return agent


async def delete_agent(agent_id: str) -> Agent:
    async with SessionLocal() as db:
        agent = await get_agent(agent_id=agent_id)
        if not agent:
            return None
        await db.delete(instance=agent)
        await db.commit()
        return agent
