import datetime
import json

from fastapi import HTTPException, Depends, APIRouter, Header
from typing import Annotated, List

from pydantic import BaseModel
from pywebpush import webpush, WebPushException

from lib.config_reader import config
from lib.init import vapid_private_key_path, admin_email
from lib.models import Statistic, Subscription, Direction

router = APIRouter(prefix='/internal')


async def verify_internal_token(token: Annotated[str, Header()]):
    if token == config.internal_token.get_secret_value():
        return {"verified": True}
    else:
        raise HTTPException(status_code=403, detail="INVALID TOKEN")


class InternalStatsPydantic(BaseModel):
    time: str
    direction: str
    stats: str
    hash: str


@router.post('/add_stats')
async def add_stats(data: InternalStatsPydantic, commons=Depends(verify_internal_token)):
    direction = Direction.select().where(Direction.name == data.direction).get()
    Statistic.create(time=data.time, stats=data.stats, hash=data.hash, direction=direction)
    return {'status': 'success'}


@router.get('/get_directions')
async def get_directions(commons=Depends(verify_internal_token)):
    directions = []
    for direction in Direction.select():
        statistic = direction.stats.select().order_by(Statistic.time.desc())
        stats = ''
        hash = ''
        if statistic.exists():
            statistic = statistic.get()
            stats = statistic.stats
            hash = statistic.hash

        directions.append({
            'name': direction.name,
            'url': direction.url,
            'hash': hash,
            'stats': stats
        })

    return {'status': 'success', 'content': directions}


class InternalAddDirectionPydantic(BaseModel):
    name: str
    url: str


@router.post('/add_direction')
async def add_direction(data: InternalAddDirectionPydantic, commons=Depends(verify_internal_token)):
    Direction.create(name=data.name, url=data.url)
    return {'status': 'success'}


class InternalSendPushNotificationPydantic(BaseModel):
    title: str
    body: str


@router.post('/send_push_notifications')
async def send_push_notifications(data: InternalSendPushNotificationPydantic, commons=Depends(verify_internal_token)):
    try:
        for Sub in Subscription.select():
            webpush(
                subscription_info=json.loads(Sub.pushSubscription),
                data=json.dumps({
                    'title': data.title,
                    'body': data.body
                }),
                vapid_private_key=vapid_private_key_path,
                vapid_claims={
                    'sub': f'mailto:{admin_email}'
                }
            )
        return {'status': 'success'}
    except WebPushException as ex:
        return {'status': 'error'}
