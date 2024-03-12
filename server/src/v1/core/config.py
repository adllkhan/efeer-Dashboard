import os
from dotenv import load_dotenv

load_dotenv()

collector_host = os.getenv('EFEER_COLLECTOR_HOST')
collector_port = os.getenv('EFEER_COLLECTOR_PORT')

dashboard_host = os.getenv('EFEER_DASHBOARD_HOST')
dashboard_port = os.getenv('EFEER_COLLECTOR_PORT')