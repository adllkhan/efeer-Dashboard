import logging
import asyncio
from typing import AsyncGenerator
from contextlib import asynccontextmanager

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api import (
    router_events, router_agents,
    run_bot, stop_bot,
    ServerConfig, CORSConfig
)
from settings import Settings, Description


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator:
    try:
        asyncio.create_task(
            run_bot()
        )
    except KeyboardInterrupt:
        print("Exit")
    yield
    await stop_bot()

app = FastAPI(
    lifespan=lifespan,
    title=Description().TITLE,
    description=Description().DESCRIPTION,
    version=Description().VERSION
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[CORSConfig().CLIENT_HOST, CORSConfig().WAZUH_HOST],
    allow_credentials=Settings().ALLOW_CREDENTIALS,
    allow_methods=Settings().ALLOW_METHODS,
    allow_headers=Settings().ALLOW_HEADERS,
)

app.include_router(router=router_events, prefix="/api", tags=["Events"])
app.include_router(router=router_agents, prefix="/api", tags=["Agents"])

if __name__ == "__main__":
    logging.info(logging.INFO)

    try:
        uvicorn.run(
            app="main:app",
            host=ServerConfig().HOST,
            port=ServerConfig().PORT,
            reload=Settings().SERVER_RELOAD
        )
    except KeyboardInterrupt:
        print("Exit")
