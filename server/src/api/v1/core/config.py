from pydantic_settings import BaseSettings
from dotenv import load_dotenv


load_dotenv()


class Config(BaseSettings):
    TITLE: str
    VERSION: str
    DESCRIPTION: str

    COLLECTOR_HOST: str
    COLLECTOR_PORT: int

    SERVER_HOST: str
    SERVER_PORT: int

    CLIENT_HOST: str
    CORS_CREDENTIALS: bool
    CORS_METHODS: str
    CORS_HEADERS: str

    BOT_TOKEN: str

    DATABASE_URL: str

    WAZUH_HOST: str
    WAZUH_USER: str
    WAZUH_PASSWORD: str
