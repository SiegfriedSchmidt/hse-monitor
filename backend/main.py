import asyncio

import uvicorn
from fastapi import Request, FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware

from lib.init import server_host, server_port
from lib.logger import setup_uvicorn_logger, setup_peewee_logger, logger
from lib.routers import stats_router, internal_router

main_router = APIRouter(prefix='/api')
app = FastAPI(title='fastapi')
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@main_router.get('/')
async def main(request: Request):
    return {'title': 'Hello, world!'}


async def main():
    main_router.include_router(stats_router.router)
    main_router.include_router(internal_router.router)

    setup_peewee_logger()
    setup_uvicorn_logger()

    app.include_router(main_router)
    config = uvicorn.Config(app, host=server_host, port=server_port, log_level="debug", log_config=None, workers=1)
    server = uvicorn.Server(config)

    await server.serve()


if __name__ == '__main__':
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        logger.info('Server successfully exited.')
