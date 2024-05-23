from aiogram import Router
from aiogram.types import Message
from aiogram.filters import Command
from aiogram.fsm.context import FSMContext

from api.repositories import AgentsCRUD
from api.database import agents_collection
from api.bot.states import Register


router = Router()
crud = AgentsCRUD(collection=agents_collection)


@router.message(Command("register"))
async def command(message: Message, state: FSMContext):
    chats = [
        agent["chat_id"] for agent in await crud.get()
    ]
    if str(message.chat.id) in chats:
        await message.reply(text="you are already registered")
        return

    await state.set_state(Register.token)
    await message.reply(text="send me your token")


@router.message(Register.token)
async def register(message: Message, state: FSMContext):
    await state.update_data(token=message.text)
    data = await state.get_data()
    await state.clear()

    tokens = [agent["token"] for agent in await crud.get()]
    if data["token"] not in tokens:
        await message.reply(text="no such tokens in database")
        return

    agent = await crud.get_one_by_token(token=message.text)
    agent["chat_id"] = str(message.chat.id)
    result = await crud.update(object=agent)
    if result is None:
        await message.reply(text="something went wrong")
        return
    await message.reply(text="you are registered")
