"""

"""
import os
from uber_rides.client import UberRidesClient
from dotenv import load_dotenv
import time


load_dotenv('.env')


def get_uber(session):
    """
    Get the uber estimates (time and surge price)
    :param session: the current uber session based on the uber token app
    :type session: uber_rides.session Session object
    :return:
    :rtype:
    """
    get_these = ['Black', 'UberXL', 'UberX', 'Pool']
    client = UberRidesClient(session)
    response = client.get_pickup_time_estimates(os.getenv('AMIDA_LAT'), os.getenv('AMIDA_LONG'))
    time_estimates = response.json.get('times')
    if time_estimates is not None:
        return_vals = {}
        for product in time_estimates:
            if product['display_name'] in get_these:
                ind_est = time.gmtime(product['estimate'])
                minutes = ind_est.tm_min
                if ind_est.tm_sec > 30:
                    minutes += 1
                return_vals[product['display_name']] = f'{minutes} min'
        return return_vals

    return {}
