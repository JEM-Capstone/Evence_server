const Sequelize = require('sequelize')
const db = require('../db')

/* not sure if we'll need this model or not... relevant RSVPs for a user
(i.e. those within a certain # of linkedIn connections) might end up just
being saved on the event model, and this data just gets pulled and sent straight over
to the linkedIn API */

const Rsvp = db.define('rsvp', {
  placeholder: {
    type: Sequelize.JSON,
  },
})

module.exports = Rsvp
