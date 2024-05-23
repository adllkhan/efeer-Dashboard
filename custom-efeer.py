#!/var/ossec/framework/python/bin/python3
# custom-efeer.py
# Custom Wazuh integration script to send alerts to efeer-Dashboard

import sys
import json
from requests import post, ConnectionError
from datetime import datetime

# Read parameters when integration is run
alert_file = sys.argv[1]
hook_url = sys.argv[3]

# Read the alert file
with open(alert_file) as f:
    alert_json = json.load(f)

# Send request to efeer-Dashboard
try:
    response = post(hook_url, json=alert_json)
except ConnectionError as e:
    with open("/var/ossec/logs/integrations.log", "a") as f:
        f.write(f"\n{str(e)}")

# Handle errors and log
if response.status_code >= 400:
    with open("/var/ossec/logs/integrations.log", "a") as f:
        f.write(
            f"\n[ efeer ] {datetime.now()} - [{response.status_code}] {response.json()['detail']}"
        )

sys.exit(0)
