import os
from pathlib import Path

secret_folder_path = Path(
    os.environ.get("SECRET_FOLDER_PATH", Path(__file__).parent.parent.parent.absolute() / 'secret')
)
database_path = Path(
    os.environ.get("DATABASE_FOLDER_PATH", Path(__file__).parent.parent.absolute())
) / 'database.sqlite3'

admin_email = os.environ.get("ADMIN_EMAIL", 'admin@mail.ru')
server_host = os.environ.get("HOST", "192.168.1.1")
server_port = int(os.environ.get("PORT", 8003))
vapid_private_key_path = secret_folder_path / 'private_key.pem'
