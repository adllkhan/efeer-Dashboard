from fastapi import APIRouter
from fastapi.responses import JSONResponse

from api.v1 import services, schemas


router = APIRouter(prefix='/token')


@router.get('', response_class=JSONResponse)
async def generate_token(agent_id: str):
    return await services.generate_token(agent_id=agent_id)


@router.delete('', response_model=schemas.TokenOut)
async def delete_token(token: schemas.TokenDelete):
    return await services.delete_token(token)
