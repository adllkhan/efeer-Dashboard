from pydantic_settings import BaseSettings
from pydantic import Field
from dotenv import load_dotenv


load_dotenv()


class ServerConfig(BaseSettings):
    HOST: str = Field(alias="SERVER_HOST")
    PORT: int = Field(alias="SERVER_PORT")


class CORSConfig(BaseSettings):
    CLIENT_HOST: str
    WAZUH_HOST: str


class BotConfig(BaseSettings):
    TOKEN: str = Field(alias="BOT_TOKEN")


class DatabaseConfig(BaseSettings):
    URL: str = Field(alias="DATABASE_URL")
