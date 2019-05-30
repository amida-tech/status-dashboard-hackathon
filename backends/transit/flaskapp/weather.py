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
    contents = json.loads(requests.get(req_str).content)
    current = contents['currently']
    return {
        # use minutely summary for summary of weather over next hour, rather than this instance
        # that gives us results like "Possible light rain starting in 45 min".
        'summary': contents['minutely']['summary'],
        'precipitation': f'{current["precipProbability"]}%',
        'temperature': round(current['temperature'], 1) # round to 1dp
    }
