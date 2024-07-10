import os
from pathlib import Path

secret_folder_path = Path(
    os.environ.get("SECRET_FOLDER_PATH", Path(__file__).parent.parent.parent.absolute() / 'secret')
)

update_timeout = int(os.environ.get("UPDATE_TIMEOUT", 60))
api_host = os.environ.get("API_HOST", "192.168.1.1")
api_port = os.environ.get("API_PORT", "8003")
