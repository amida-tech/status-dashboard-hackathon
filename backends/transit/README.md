# Transit Backend
## Overview
Create endpoint to tie together:
* Uber time estimates
* Weather
* Lyft time estimates
 
## Getting started
This repo uses python 3.6+, so make sure that version of Python is downloaded

* Clone the repo to a local folder
* Create a virtual environment
```bash
cd backends/transit
```
```bash
python3 -m venv env
```
```bash
source env/bin/activate
```

* Install the dependencies
```bash
pip install -r requirements.txt
```

* Copy the `.example.env` file into a new file called `.env`
```bash
cp .example.env .env
```

## Config
Make sure to set the `UBER_KEY` in the `.env` (see _1password_)

## Run the FlaskApp
```bash
cd backends/transit
```
```bash
python -m flask run
```
NOTE: You can use a client to test post/get requests (e.g., [Postman](https://www.getpostman.com/))

**Linting**
* To test for linting errors, run the following (this runs for both the evaluation module and flask app)
```bash
 pylint src process
```
* Any linting errors should be fixed or ignored (where appropriate)

**Testing**
* To run the test suite, run the following command to see passing tests and coverage statistics
```bash
pytest --cov=src tests/
``` 
* NOTE: For more output in the terminal, use the `--verbose` flag

## Endpoint(s)
### current_transity
The current information that we are querying for the transit stuff is in one endpoint (for now)
* Running locally, send a `GET` request to http://127.0.0.1:5000/current_transit