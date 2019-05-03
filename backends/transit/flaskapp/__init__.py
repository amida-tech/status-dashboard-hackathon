import os
from flask import Flask, jsonify
from dotenv import load_dotenv
from uber_rides.session import Session
from .uber import get_uber


load_dotenv('.env')
APP = Flask(__name__)

if 'UBER_SESSION' not in locals():
    UBER_SESSION = Session(server_token=os.getenv('UBER_KEY'))


@APP.route('/current_transit', methods=['GET'])
def get_current():
    """
    For a new set of captured data, we want to apply the pre-trained model
    """
    uber_response = get_uber(UBER_SESSION)

    return jsonify({
        'uber_times': uber_response
    })
