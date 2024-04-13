from aiogram import Router
from aiogram.types import Message
from aiogram.filters import Command
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup

from api.v1 import repositories


router = Router()


class Register(StatesGroup):
    company_token = State()


@router.message(Command("register"))
async def command(message: Message, state: FSMContext):

    chats = [
        int(agent.chat_id) if agent.chat_id
        else None
        for agent in await repositories.get_agents()
    ]
    if message.from_user.id in chats:
        await message.reply(text="you are already registered")
        return

    await state.set_state(Register.company_token)
    await message.reply(text="send me your token")


@router.message(Register.company_token)
async def register(message: Message, state: FSMContext):
    await state.update_data(company_token=message.text)
    data = await state.get_data()
    tokens = [agent.token for agent in await repositories.get_agents()]

    await state.clear()
    if data["company_token"] not in tokens:
        await message.reply(text="no such tokens in database")
        return

    agent = await repositories.get_agent_by_token(token=message.text)
    agent.chat_id = message.chat.id
    await repositories.update_agent(agent=agent)
    await message.reply(text="you are registered")
