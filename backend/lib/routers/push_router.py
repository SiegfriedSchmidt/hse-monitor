import json

from fastapi import APIRouter
from pydantic import BaseModel

from lib.config_reader import config
from lib.models import Subscription

router = APIRouter(prefix='/push')


@router.get('/key')
async def key():
    return {'status': 'success', 'content': {"applicationServerKey": config.application_server_key.get_secret_value()}}


class AddSubscriptionPydantic(BaseModel):
    pushEnabled: bool | None = None
    subId: int | None = None
    subscription: str | None = None


@router.post('/change_subscription')
async def change_subscription(data: AddSubscriptionPydantic):
    if data.pushEnabled:
        subscription = Subscription.select().where(Subscription.pushSubscription == data.subscription)
        if subscription.exists():
            return {'status': 'success', 'content': subscription.get().id}
        subscription = Subscription.create(pushSubscription=data.subscription)
        return {'status': 'success', 'content': subscription.id}
    else:
        Subscription.delete().where(Subscription.id == data.subId).execute()
        return {'status': 'success', 'content': ''}
