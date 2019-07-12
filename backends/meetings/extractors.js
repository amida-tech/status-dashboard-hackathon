const _ = require('lodash')
const moment = require('moment-timezone')

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

    const loc = e.location || ''
    let phones = extractPhones(loc)
    if (phones && phones.length) {
        return Object.assign({}, baseInfo, {
            phone: phones[0],
            altPhones: phones.slice(1),
            pin: extractPin(loc),
        })
    }

    const description = e.description || ''
    phones = extractPhones(description)
    if (phones && phones.length) {
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

function extractFreeBusy(obj = { busy: [] }) {
    const { busy } = obj
    const now = moment()
    const busyNow = busy.length && busy.some(e => moment(e.start).isBefore(now) && now.isBefore(moment(e.end)))

    return {
        status: busyNow ? 'busy' : 'free',
    }
}

module.exports = {
  extractPhones,
  extractPin,
  extractRawConference,
  formatPhone,
  extractConference,
  extractResponse,
  formatEvent,
  extractFreeBusy,
}
