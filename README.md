# status-dashboard-hackathon

# Frontend

## Setup / Config 

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
- We have set up some scss variables for your use, including a full color palette.
- In `frontend/src/styles/variables.scss` you can find:
  - A variety of Amida branded Blues & Grays 
  - Sensible font sizes for display on a television 

### State Manegment / Async API calls
- In `frontend/src/store.js` there is an example of an async call to the WMATA api and storage of the response from that call in a globally available store. 
- In `frontend/src/components/HelloWorld.vue` there is an example of a dispatch to the above action and then accessing the store and displaying the response from that api call on the page. 

# Backend
We have included a backend directory, but each backend should be placed in it's own folder. 
