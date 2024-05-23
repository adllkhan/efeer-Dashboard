from pydantic import BaseModel, Field


class Agent(BaseModel):
    id: str = Field(alias="_id")
    name: str
    token: str | None = None
    chat_id: str | None = None


class AgentOut(BaseModel):
    id: str = Field(alias="_id")
    name: str


class AgentIn(BaseModel):
    id: str = Field(alias="_id")


class AgentsInfo(BaseModel):
    pages: int
    total: int
    limit: int


class AgentsOut(BaseModel):
    agents: list[AgentOut]
    info: AgentsInfo | None = None
