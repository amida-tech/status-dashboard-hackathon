# calander

https://developers.google.com/calendar/quickstart/nodejs

have to get a list of users.

get their calendar list.
then get each of those calendars (or just their primary if poosible).

then look for OOO.

alternatively look for the team travel cal.

Instructions here: https://developers.google.com/calendar/quickstart/nodejs

## Usage
```
> npm install

# Starts express server
> npm serve

# Hit end point
> curl localhost:3000
```

## Example output
```
[
  {
    "start": "2019-04-25",
    "end": "2019-05-07",
    "summary": "Mike OOO",
    "name": "Mike",
    "type": "OOO"
  },
  {
    "start": "2019-05-01",
    "end": "2019-05-04",
    "summary": "Michael Lovito OOO",
    "name": "Lovito",
    "type": "OOO"
  },
  {
    "start": "2019-05-02",
    "end": "2019-05-04",
    "summary": "Andrew OOO",
    "name": "Andrew",
    "type": "OOO"
  }
]
```
