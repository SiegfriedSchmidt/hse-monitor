from fastapi import APIRouter

router = APIRouter(prefix='/stats')


@router.get('/getSelection')
async def getSelection():
    return {'status': 'success', 'content': events}


@router.get('/getStatistic')
async def getStatistic():
    return {'status': 'success', 'content':}
