from datetime import datetime

from pydantic import BaseModel, Field


class OS(BaseModel):
    arch: str
    codename: str
    major: str
    minor: str
    name: str
    platform: str
    uname: str
    version: str


class Agent(BaseModel):
    os: OS
    last_keep_alive: str = Field(alias="lastKeepAlive")
    version: str
    status: str
    register_ip: str = Field(alias="registerIP")
    group_config_status: str
    status_code: int
    id: str
    manager: str
    date_add: datetime = Field(alias="dateAdd")
    name: str
    ip: str
    node_name: str
