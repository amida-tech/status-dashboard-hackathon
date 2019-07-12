require('dotenv').config()

const rooms = {
  big: process.env.GCAL_BIG_CONFERENCE_ROOM_ID,
  small: process.env.GCAL_SMALL_CONFERENCE_ROOM_ID,
  table: process.env.GCAL_TABLE_CONFERENCE_ROOM_ID,
}

module.exports = {
  rooms,
}
