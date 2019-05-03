"""

"""
import json
import requests


def get_weather():
    """
    Get the weather for Amida using DarkSky
    :return:
    :rtype:
    """
    req_str = 'https://api.darksky.net/forecast/fa61e176e33ace5c6ed4eeb98ce0978f/38.906350,-77.039100'
    contents = requests.get(req_str).content
    current = json.loads(contents)['currently']
    return {
        'summary': current['summary'],
        'precipitation': f'{current["precipProbability"]}%',
        'temperature': current['temperature']
    }
