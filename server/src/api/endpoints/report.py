from fastapi import APIRouter
from fastapi.responses import FileResponse

from api.services import ReportService, EventsService


router = APIRouter(prefix="/report")
e_services = EventsService()
r_services = ReportService()


@router.get("", response_class=FileResponse)
async def get_report(event_id: str) -> FileResponse:
    event = await e_services.get_event(event_id=event_id)
    report_path = r_services.render_pdf(event=event)
    return FileResponse(path=report_path)
