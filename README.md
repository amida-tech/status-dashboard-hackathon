# status-dashboard-hackathon

# Dockerized Install
* Setup `.env` appropriately
* Copy service user `kubecfg` to `.kubecfg`
* `docker-compose build`
* Run `docker run --rm --env-file .env -it --entrypoint /app/authorize.sh status-dashboard-hackathon_calendar` to authorize calendar app for OAuth and paste the `GCAL_TOKEN=...` line into `.env` as directed
* `docker-compose up`

# Frontend

## Setup / Config 
See [here](kiosk/README.md) for scripts to automate installing the dashboard (both frontend and backend) onto a Raspberry Pi or similar device.

### Local Install

```
npm install
cd src
cp .config.example.js config.js
```

### config.js
- Config currently consists of one simple variable: our WMATA API key
- Search for `Grant's WMATA key` in 1pass to get your local `config` up to snuff

### Local Run

`npm run serve`

## Included in Boilerplate

### Styles
- We have set up some scss variables for your use, in the directory `/styles`

### State Manegment / Async API calls
- In `frontend/src/store.js` there is an example of an async call to the WMATA api and storage of the response from that call in a globally available store. 
- In `frontend/src/components/HelloWorld.vue` there is an example of a dispatch to the above action and then accessing the store and displaying the response from that api call on the page. 

# Backend
We have included a backend directory, but each backend should be placed in it's own folder. 
