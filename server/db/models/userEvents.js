const Sequelize = require('sequelize')
const db = require('../db')

const UserEvents = db.define('userEvents', {
  placeholder: {
    type: Sequelize.JSON,
  },
})

module.exports = UserEvents
