from pydantic_settings import BaseSettings


class Description(BaseSettings):
    TITLE: str = "efeer-Dashboard"
    DESCRIPTION: str = (
        "Back-end of DFIR system 'efeer-Dashboard', that works with Wazuh-manager(Core). Features: Telegram Response."
    )
    VERSION: str = "0.0.1"
