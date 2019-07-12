'use strict'

require('dotenv').config()

const { google } = require('googleapis')
const moment = require('moment-timezone')
const route = require('koa-route')
const _ = require('lodash')
const cors = require('@koa/cors')
const Koa = require('koa')
const {
  extractPhones,
  extractPin,
  extractRawConference,
  formatPhone,
  extractConference,
  extractResponse,
  formatEvent,
  extractFreeBusy,
} = require('./extractors')
const { rooms } = require('./config')

require('dotenv').config()

async function gcalClient() {
    const oAuth2Client = new google.auth.OAuth2(process.env.GCAL_CLIENT_ID, process.env.GCAL_CLIENT_SECRET, process.env.GCAL_REDIRECT_URI)
    const token = JSON.parse(process.env.GCAL_TOKEN, 'base64')

    oAuth2Client.setCredentials(token)
    return google.calendar({version: 'v3', auth: oAuth2Client})
}

async function getEvents(calendar, opts = {}) {
    if (!opts.limit) { opts.maxResults = 100 }
    if (!opts.start) { opts.start = moment().tz('America/New_York').startOf('day') }
    if (!opts.end) { opts.end = opts.start.clone().endOf('day') }
    if (!opts.calendarId) { opts.calendarId = 'primary' }
    const res = await calendar.events.list({
        calendarId: opts.calendarId,
        timeMin: opts.start.toISOString(),
        timeMax: opts.end.toISOString(),
        maxResults: opts.limit,
        singleEvents: true,
        orderBy: 'startTime',
    })
    return res.data.items
}

async function byDay() {
    const calendar = await gcalClient()
    const events = await getEvents(calendar, {
        start: moment(),
        end: moment().tz('America/New_York').add(6, 'days').endOf('day'),
    })
    const days = {}
    events.forEach((e) => {
        const start = moment(e.start.dateTime).format('YYYY-MM-DD')
        if (!days[start]) { days[start] = [] }
        days[start].push(e)
    })
    const daysArr = Object.keys(days).map(day => ({
        day,
        events: days[day].map(formatEvent),
    }))
    return { days: daysArr }
}

async function nextEvent(requirePhone = false, calendarId, opts = {}) {
    const calendar = await gcalClient()
    const events = (await getEvents(calendar, Object.assign({
        limit: 5,
        start: moment(),
        end: moment().endOf('day').add(2, 'week'),
        calendarId,
    }, opts))).map(formatEvent)
    const e = events.find(e => (
        (e.response === 'accepted' || e.response === 'tentative')
        && (!requirePhone || e.conference.phone)
    ))
    return { event: e }
}

async function nextEventAllRooms() {
    const events = {}
    for (let [room, roomId] of Object.entries(rooms)) {
        events[room] = (await nextEvent(false, roomId)).event
    }
    return events
}

async function freeRooms(opts = {}) {
    const calendar = await gcalClient()
    if (!opts.start) { opts.start = moment().tz('America/New_York').startOf('day') }
    if (!opts.end) { opts.end = opts.start.clone().endOf('day') }

    const res = await calendar.freebusy.query({
        resource: {
            timeMin: opts.start.toISOString(),
            timeMax: opts.end.toISOString(),
            items: Object.values(rooms).map(id => ({ id })),
        },
    })
    const calendars = res.data.calendars

    const result = {}
    for (let [room, roomId] of Object.entries(rooms)) {
        result[room] = extractFreeBusy(calendars[roomId])
    }

    return result
}

async function combined() {
    const result = {}

    for (let [room, roomId] of Object.entries(rooms)) {
        const nextEv = (await nextEvent(false, roomId)).event
        const busy = moment(nextEv.start).isBefore(moment()) || (room === 'small')
        
        result[room] = {
            busy,
            current_event: busy ? nextEv : null,
            next_event: busy ? (await nextEvent(false, roomId, {
                start: moment(nextEv.end).add(1, 'second'),
            })).event : nextEv,
        }
    }

    return result
}

async function run() {
    const app = new Koa()
    app.use(cors())
    const routes = {
        nextEvent: async (ctx) => { ctx.body = await nextEvent(false) },
        nextEvents: async (ctx) => { ctx.body = await nextEventAllRooms() },
        nextConference: async (ctx) => { ctx.body = await nextEvent(true) },
        combined: async (ctx) => { ctx.body = await combined() },
        byDay: async (ctx) => { ctx.body = await byDay() },
        freeRooms: async (ctx) => { ctx.body = await freeRooms() },
    }
    app.use(route.get('/next_event', routes.nextEvent))
    app.use(route.get('/next_events', routes.nextEvents))
    app.use(route.get('/next_conference', routes.nextConference))
    app.use(route.get('/by_day', routes.byDay))
    app.use(route.get('/free_rooms', routes.freeRooms))
    app.use(route.get('/combined', routes.combined))
    app.listen(3000)
}

run()
