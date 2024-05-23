from pydantic import BaseModel


class Message(BaseModel):
    agent_id: str
    event_id: str
