"""

"""
import json
import requests
import os


def get_weather():
    """
    Get the weather for Amida using DarkSky
    :return:
    :rtype:
    """
    req_str = f'https://api.darksky.net/forecast/{os.getenv("DARKSKY_KEY")}/38.906350,-77.039100'
    contents = requests.get(req_str).content
    current = json.loads(contents)['currently']
    return {
        'summary': current['summary'],
        'precipitation': f'{current["precipProbability"]}%',
        'temperature': current['temperature']
    }
