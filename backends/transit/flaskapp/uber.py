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
    return_vals = {}
    client = UberRidesClient(session)
    # Get the nearest car estimates
    time_rep = client.get_pickup_time_estimates(os.getenv('AMIDA_LAT'), os.getenv('AMIDA_LONG'))
    time_estimates = time_rep.json.get('times')
    if time_estimates is not None:
        for product in time_estimates:
            if product['display_name'] in get_these:
                ind_est = time.gmtime(product['estimate'])
                minutes = ind_est.tm_min
                if ind_est.tm_sec > 30:
                    minutes += 1
                return_vals[product['display_name']] = f'{minutes} min'

    # Get the surge multiplier
    surge_resp = client.get_price_estimates(start_latitude=os.getenv('AMIDA_LAT'),
                                            start_longitude=os.getenv('AMIDA_LONG'),
                                            end_latitude=os.getenv('DUP_LAT'),
                                            end_longitude=os.getenv('DUP_LONG'),
                                            seat_count=2)
    surge_est = surge_resp.json.get('prices')
    if surge_est is not None:
        first = surge_est[0]
        return_vals['surge_multiplier'] = f'{first["surge_multiplier"]}x' \
            if 'surge_multiplier' in first.keys() else '1x'

    return return_vals
