from aiogram import Bot, Dispatcher

from api.v1.core import Config
from .handlers import router


bot = Bot(token=Config().BOT_TOKEN)
dp = Dispatcher()

dp.include_router(router=router)


async def run():
    await dp.start_polling(bot)


async def stop():
    await dp.stop_polling()
