from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    ALLOW_CREDENTIALS: bool = True
    ALLOW_METHODS: list[str] = ["GET", "POST", "UPDATE", "DELETE"]
    ALLOW_HEADERS: list[str] = ["*"]

    SERVER_RELOAD: bool = True

    TEMPLATES_DIR: str = "./server/src/templates"
    REPORTS_DIR: str = "./server/src/reports"
