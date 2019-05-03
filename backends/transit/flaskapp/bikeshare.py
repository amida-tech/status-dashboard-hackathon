"""

"""
import urllib.request
import json


def get_bikes():
    """
    Get information about Capital Bikeshare via:
        https://gbfs.capitalbikeshare.com/gbfs/fr/station_status.json
        https://gbfs.capitalbikeshare.com/gbfs/fr/station_information.json
        https://gbfs.capitalbikeshare.com/gbfs/gbfs.json
        https://www.capitalbikeshare.com/system-data
    :return:
    :rtype:
    """
    status_url = 'https://gbfs.capitalbikeshare.com/gbfs/fr/station_status.json'
    closest_stations = {
        '79': '18th & M St NW',
        '229': '17th St & Massachusetts Ave NW',
        '136': 'Rhode Island & Connecticut Ave NW'
    }
    with urllib.request.urlopen(status_url) as url:
        data = json.loads(url.read().decode())

    return_vals = []
    for station in data['data']['stations']:
        if station['station_id'] in closest_stations.keys():
            return_vals.append({
                'Location': closest_stations[station['station_id']],
                'Bikes': station['num_bikes_available'],
                'Docks': station['num_docks_available']
            })

    return return_vals
