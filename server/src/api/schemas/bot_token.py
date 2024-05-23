from pydantic import BaseModel


class BotTokenOut(BaseModel):
    token: str


class BotTokenDelete(BotTokenOut):
    agent_id: str
