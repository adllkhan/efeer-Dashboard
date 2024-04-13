from pydantic import BaseModel


class TokenDelete(BaseModel):
    agent_id: str


class TokenOut(BaseModel):
    token: str
