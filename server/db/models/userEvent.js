const Sequelize = require('sequelize')
const db = require('../db')

const UserEvent = db.define('userEvent', {
  eventName: {
    type: Sequelize.STRING,
  },
  eventId: { //meetup eventId - change name
    type: Sequelize.STRING,
  },
  photo: {
    type: Sequelize.TEXT,
  },
  eventGroup: {
    type: Sequelize.STRING
  },
  date: {
    type: Sequelize.STRING,
  },
  time: {
    type: Sequelize.STRING,
  },
  eventCity: { // grab from the group location
    type: Sequelize.STRING,
  },
  rsvps: {
    type: Sequelize.INTEGER,
  },
  venueName: {
    type: Sequelize.STRING,
  },
  venueAddress: {
    type: Sequelize.STRING,
  },
  fee: {
    type: Sequelize.INTEGER,
  },
  description: {
    type: Sequelize.TEXT,
  },
  webActions: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
  directLink: {
    type: Sequelize.STRING,
  },
  pastEvents: {
    type: Sequelize.INTEGER,
  },
  hosts: { // [[name, meetupId, photo_link], [...]]
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
})

module.exports = UserEvent
