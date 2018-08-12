const Sequelize = require('sequelize')
const db = require('../db')

const UserEvent = db.define('userEvent', {
  placeholder: {
    type: Sequelize.JSON,
  },
})

module.exports = UserEvent
