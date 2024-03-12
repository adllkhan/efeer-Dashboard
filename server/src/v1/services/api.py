import requests


def get_events_from_wazuh() -> str:
    res = requests.get('http://192.168.175.128:8000/logs')
    output = res.json().split('\n')
    return output
