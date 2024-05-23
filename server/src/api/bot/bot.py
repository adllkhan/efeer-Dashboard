from aiogram import Bot, Dispatcher

from api.core import BotConfig
from .handlers import router


bot = Bot(token=BotConfig().TOKEN)
dp = Dispatcher()

dp.include_router(router=router)


async def run():
    await dp.start_polling(bot)


async def stop():
    await dp.stop_polling()
