from weasyprint import HTML
from jinja2 import FileSystemLoader, Environment


class ReportService:
    def render_pdf(self, event: dict) -> str:
        env = Environment(loader=FileSystemLoader("./server/src/templates"))
        template = env.get_template("report.html")
        template = env.get_template("report.html")
        template = HTML(
            string=template.render(
                event=event
            )
        )
        template.write_pdf(target="./server/src/reports/report.pdf")
        return "./server/src/reports/report.pdf"

    def render_caption(self, event: dict) -> str:
        return f"New Event detected!\n{event["rule"]["description"]} level: {event["rule"]["level"]}.\n\nMore Information:\nhttps://attack.mitre.org/techniques/{event["rule"]["mitre"]["id"][0]}"
