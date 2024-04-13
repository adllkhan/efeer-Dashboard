from uuid import uuid4

from fastapi import status
from fastapi.responses import JSONResponse

from api.v1 import repositories, models, services, schemas


async def generate_token(agent_id: str) -> JSONResponse:
    agents = await services.get_agents()
    if agents is JSONResponse:
        return agents
    ids = [agent["id"] for agent in agents]
    if agent_id not in ids:
        return JSONResponse(
            content={"details": "Agent not found."},
            status_code=status.HTTP_404_NOT_FOUND,
        )

    agents = await repositories.get_agents()

    ids = [agent.id for agent in agents]
    if agent_id in ids:
        return JSONResponse(
            content={"details": "Agent is already has token."},
            status_code=status.HTTP_400_BAD_REQUEST,
        )

    token = str(uuid4())
    tokens = [agent.token for agent in agents]
    while token in tokens:
        token = str(uuid4())

    agent = models.Agent(id=agent_id, token=token)
    agent = await repositories.create_agent(agent=agent)
    if not agent:
        return JSONResponse(
            content={"details": "Agent has not been added to the database."},
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
        )

    return JSONResponse(
            content={"token": token},
            status_code=status.HTTP_201_CREATED,
    )


async def delete_token(
    token: schemas.TokenDelete
) -> schemas.TokenOut | JSONResponse:

    agents = await repositories.get_agents()
    if not agents:
        return JSONResponse(
            content={
                "details": "There are no agents in database."
            },
            status_code=status.HTTP_404_NOT_FOUND,
        )

    ids = [agent.id for agent in agents]
    if token.agent_id not in ids:
        return JSONResponse(
            content={"details": "Agent not found."},
            status_code=status.HTTP_404_NOT_FOUND,
        )

    agent = await repositories.delete_agent(agent_id=token.agent_id)
    if not agent:
        return JSONResponse(
            content={"details": "Agent was not removed from the database."},
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
        )

    return schemas.TokenOut(token=agent.token)
