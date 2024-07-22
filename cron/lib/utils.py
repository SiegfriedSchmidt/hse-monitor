import requests
import hashlib
import datetime
from lib.logger import logger


def time_in_range(start: datetime.time | str, end: datetime.time | str, x: datetime.time):
    """Return true if x is in the range time [start, end]"""

    if isinstance(start, str):
        start = datetime.time(*map(int, start.split(':')))
    if isinstance(end, str):
        end = datetime.time(*map(int, end.split(':')))

    if start <= end:
        return start <= x <= end
    else:
        return start <= x or x <= end


def get_time():
    return datetime.datetime.now().time()


def download_file(url):
    try:
        return requests.get(url, allow_redirects=True).content
    except Exception as error:
        logger.error(f'Downloading file failed! ({error.__class__.__name__})')
        return b''


def write_file(content: bytes, path):
    with open(path, 'wb') as file:
        file.write(content)


def read_file(path):
    with open(path, 'rb') as file:
        return file.read()


def md5(content: bytes):
    return hashlib.md5(content).hexdigest()


if __name__ == '__main__':
    print(time_in_range('12:00', '12:01', get_time()))
