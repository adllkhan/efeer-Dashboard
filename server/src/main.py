import logging
import asyncio
from typing import AsyncGenerator
from contextlib import asynccontextmanager

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.v1 import (
    router_events, router_agents, router_token,
    init_db,
    run_bot, stop_bot,
    Config
)


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator:
    await init_db()
    asyncio.create_task(
        run_bot()
    )
    yield
    await stop_bot()

app = FastAPI(
    lifespan=lifespan,
    title=Config().TITLE,
    version=Config().VERSION,
    description=Config().DESCRIPTION
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=Config().CLIENT_HOST,
    allow_credentials=Config().CORS_CREDENTIALS,
    allow_methods=list(Config().CORS_METHODS),
    allow_headers=list(Config().CORS_HEADERS),
)

app.include_router(router=router_events, prefix="/api/v1", tags=["Events"])
app.include_router(router=router_agents, prefix="/api/v1", tags=["Agents"])
app.include_router(router=router_token, prefix="/api/v1", tags=["Token"])

if __name__ == "__main__":
    try:
        logging.info(logging.INFO)
        uvicorn.run(
            app="main:app",
            host=Config().SERVER_HOST,
            port=Config().SERVER_PORT,
            reload=True
        )
    except KeyboardInterrupt:
        print("Exit")
