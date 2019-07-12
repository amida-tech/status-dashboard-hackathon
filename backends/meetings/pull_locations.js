'use strict'

require('dotenv').config()

const { google } = require('googleapis')
const moment = require('moment-timezone')
const _ = require('lodash')
const users = require('./users.json')
const sleep = require('sleep-promise')

async function gcalClient() {
    const oAuth2Client = new google.auth.OAuth2(process.env.GCAL_CLIENT_ID, process.env.GCAL_CLIENT_SECRET, process.env.GCAL_REDIRECT_URI)
    const token = JSON.parse(process.env.GCAL_TOKEN, 'base64')

    oAuth2Client.setCredentials(token)
    return google.calendar({version: 'v3', auth: oAuth2Client})
}

async function getLocations(calendar, user) {
    const res = await calendar.events.list({
        calendarId: user,
        timeMin: moment().tz('America/New_York').startOf('week').subtract(2, 'week').toISOString(),
        timeMax: moment().tz('America/New_York').endOf('week').toISOString(),
        maxResults: 100,
        singleEvents: true,
        orderBy: 'startTime',
    })
    return res.data.items.map(i => i.location).filter(l => l)
}

async function run() {
    const cal = await gcalClient()
    for (let user of users) {
        const events = await getLocations(cal, user)
        events.forEach(l => console.log(l))
        await sleep(1000)
        console.log()
        console.log()
        console.log()
        console.log()
    }
}

run()
