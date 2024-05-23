from aiogram.fsm.state import State, StatesGroup


class Register(StatesGroup):
    token = State()
