from base64 import b64encode
from typing import List

from async_lru import alru_cache
from aiohttp import ClientSession
from fastapi import status
from fastapi.responses import JSONResponse

from api.v1.core import Config


__base_url = f"https://{Config().WAZUH_HOST}:55000"
__login_url = f"{__base_url}/security/user/authenticate"
__basic_auth = f"{Config().WAZUH_USER}:{Config().WAZUH_PASSWORD}".encode()

__headers = {
    "Authorization": f"Basic {b64encode(__basic_auth).decode()}",
    "Content-Type": "application/json",
}


@alru_cache()
async def __auth() -> dict:
    async with ClientSession() as session:
        async with session.post(
            url=__login_url,
            headers=__headers,
            verify_ssl=False
        ) as response:
            if not response.ok:
                return JSONResponse(
                    content=await response.json(),
                    status_code=response.status,
                    headers=response.headers
                )
            return await response.json()


@alru_cache
async def get_agents(limit: int | None = None) -> List[dict] | JSONResponse:
    params = {"limit": limit} if limit else None
    __headers["Authorization"] = f'Bearer {(await __auth())["data"]["token"]}'

    async with ClientSession() as session:
        async with session.get(
            url=f"{__base_url}/agents",
            params=params,
            headers=__headers,
            verify_ssl=False
        ) as response:
            agents = (await response.json())["data"]["affected_items"]
            if not agents:
                return JSONResponse(
                    content={
                        "details": (
                            "There are no agents in the Wazuh database."
                        )
                    },
                    status_code=status.HTTP_404_NOT_FOUND,
                )
            return agents


@alru_cache
async def get_agent(agent_id: str) -> dict | JSONResponse:
    params = {"q": f"id={agent_id}"}
    __headers["Authorization"] = f'Bearer {(await __auth())["data"]["token"]}'

    async with ClientSession() as session:
        async with session.get(
            url=f"{__base_url}/agents",
            params=params,
            headers=__headers,
            verify_ssl=False
        ) as response:
            agents = (await response.json())["data"]["affected_items"]
            if not agents:
                return JSONResponse(
                    content={
                        "details": (
                            "There is no such agent in the Wazuh database."
                        )
                    },
                    status_code=status.HTTP_404_NOT_FOUND,
                )
            return agents[0]
