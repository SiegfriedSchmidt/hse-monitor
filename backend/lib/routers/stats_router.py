from fastapi import APIRouter
from pydantic import BaseModel

from lib.models import Statistic, Subscription, Direction

router = APIRouter(prefix='/stats')


@router.get('/getSelection')
async def getSelection():
    directions = []
    for direction in Direction.select():
        stats = []
        for stat in direction.stats.select().order_by(Statistic.time.desc()):
            stats.append({'id': stat.id, 'time': stat.time})

        directions.append({
            'name': direction.name,
            'stats': stats
        })

    return {'status': 'success', 'content': directions}


class StatsGetStatisticPydantic(BaseModel):
    statId: int


@router.post('/getStatistic')
async def getStatistic(data: StatsGetStatisticPydantic):
    statistic = Statistic.select().where(Statistic.id == data.statId)
    if not statistic.exists():
        return {'status': 'error', 'content': 'Неверный id'}

    return {'status': 'success', 'content': statistic.get().stats}
