import uvicorn
from fastapi import FastAPI

from src.v1 import events_router


app = FastAPI()

app.include_router(
    router=events_router,
    tags=['v1']
)

if __name__ == '__main__':
    uvicorn.run(app='main:app')