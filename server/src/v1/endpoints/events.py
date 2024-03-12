from fastapi import APIRouter

from ..services import get_events_from_wazuh

router = APIRouter(prefix='/events')


@router.get('/')
def get_logs():
    events = get_events_from_wazuh()
    return events

