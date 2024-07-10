from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import SecretStr
from pathlib import Path
from lib.init import secret_folder_path

env_path = secret_folder_path / Path('.env')


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=env_path, env_file_encoding='utf-8', extra='allow')
    internal_token: SecretStr
    application_server_key: SecretStr


config = Settings()
