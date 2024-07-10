import requests
from lib.config_reader import config
from lib.init import api_host, api_port
from lib.logger import logger

headers = {'token': config.internal_token.get_secret_value()}
base_path = f'http://{api_host}:{api_port}/api/internal'


class MyRequestException(BaseException):
    ...


def get_directions():
    try:
        rs = requests.get(base_path + '/get_directions', headers=headers)
        if rs.status_code != 200 or rs.json()['status'] != 'success':
            raise MyRequestException(rs.content)
        return rs.json()['content']
    except MyRequestException as error:
        logger.error(f'Api /get_directions request failed! ({repr(error)})')
        return ''
    except Exception as error:
        logger.error(f'Api /get_directions request failed! ({error.__class__.__name__})')
        return ''


def add_stats(time: str, direction: str, stats: str, hash: str):
    try:
        rs = requests.post(base_path + '/add_stats', headers=headers, json={
            'time': time, 'direction': direction, 'stats': stats, 'hash': hash
        })
        if rs.status_code != 200 or rs.json()['status'] != 'success':
            raise MyRequestException(rs.content)
        return 'success'
    except MyRequestException as error:
        logger.error(f'Api /add_stats request failed! ({repr(error)})')
        return ''
    except Exception as error:
        logger.error(f'Api /add_stats request failed! ({error.__class__.__name__})')
        return ''


def send_push_notifications(title: str, body: str):
    try:
        rs = requests.post(base_path + '/send_push_notifications', headers=headers, json={'title': title, 'body': body})
        if rs.status_code != 200 or rs.json()['status'] != 'success':
            raise MyRequestException(rs.content)
        return 'success'
    except MyRequestException as error:
        logger.error(f'Api /send_push_notifications request failed! ({repr(error)})')
        return ''
    except Exception as error:
        logger.error(f'Api /send_push_notifications request failed! ({error.__class__.__name__})')
        return ''
