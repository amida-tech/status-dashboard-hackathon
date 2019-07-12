'use strict'

require('dotenv').config()

const { google } = require('googleapis')
const moment = require('moment-timezone')
const route = require('koa-route')
const _ = require('lodash')
const cors = require('@koa/cors')
const Koa = require('koa')

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

function extractPhones(str) {
    const regex = /\(?(?:\d[ \(\)\-]*){10}/g
    return str.match(regex)
}

function extractPin(str) {
    const regex = /Conference ID: (\d+)/i
    const match = str.match(regex)
    return match ? match[1] : null
}

function extractRawConference(e) {
    const baseInfo = {
        phone: null,
        altPhones: [],
        pin: null,
        location: e.location || null,
    }

    // conference info listed by google
    const ep = _.get(e, 'conferenceData.entryPoints', []).find(ep => ep.entryPointType === 'phone')
    if (ep) {
        return Object.assign({}, baseInfo, {
            phone: ep.label,
            altPhones: [],
            pin: ep.pin,
        })
    }

    const description = e.description || ''
    const phones = extractPhones(description)
    if (phones && phones.length) {
        // TODO: handle multiple phones
        return Object.assign({}, baseInfo, {
            phone: phones[0],
            altPhones: phones.slice(1),
            pin: extractPin(description),
        })
    }

    return baseInfo
}

function formatPhone(str) {
    if (str.substring(0, 2) === '+1') { str = str.slice(2) }
    const d = str.match(/\d/g)
    if (d.length !== 10) { return `${d} (INVALID)` }
    return `(${d[0]}${d[1]}${d[2]}) ${d[3]}${d[4]}${d[5]}-${d[6]}${d[7]}${d[8]}${d[9]}`
}

function extractConference(e = {}) {
    const conference = extractRawConference(e)
    if (conference.phone) { conference.phone = formatPhone(conference.phone) }
    conference.altPhones = conference.altPhones.map(formatPhone)
    return conference
}

function extractResponse(e = {}) {
    const attendees = e.attendees || []
    const me = (e.attendees || []).find(a => a.self)
    return me ? me.responseStatus : null
}

function formatEvent(e = {}) {
    return {
        start: _.get(e, 'start.dateTime'),
        end: _.get(e, 'end.dateTime'),
        summary: _.get(e, 'summary'),
        conference: extractConference(e),
        response: extractResponse(e),
    }
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

async function nextEvent(requirePhone = false) {
    const calendar = await gcalClient()
    const events = (await getEvents(calendar, {
        limit: 5,
        start: moment(),
        // TODO: remove
        end: moment().endOf('day').add(1, 'week'),
    })).map(formatEvent)
    const e = events.find(e => (
        (e.response === 'accepted' || e.response === 'tentative')
        && (!requirePhone || e.conference.phone)
    ))
    return { event: e }
}

async function run() {
    const app = new Koa()
    app.use(cors())
    const routes = {
        nextEvent: async (ctx) => { ctx.body = await nextEvent(false) },
        nextConference: async (ctx) => { ctx.body = await nextEvent(true) },
        byDay: async (ctx) => { ctx.body = await byDay() },
    }
    app.use(route.get('/next_event', routes.nextEvent))
    app.use(route.get('/next_conference', routes.nextConference))
    app.use(route.get('/by_day', routes.byDay))
    app.listen(3000)
}

run()
