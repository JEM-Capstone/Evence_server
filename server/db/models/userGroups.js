const Sequelize = require('sequelize')
const db = require('../db')

const UserGroups = db.define('userGroups', {
  groupId: {
    type: Sequelize.INTEGER,
  },
  displayName: {
    type: Sequelize.STRING,
  },
  urlName: {
    type: Sequelize.STRING,
  },
  members: {
    type: Sequelize.INTEGER,
  },
  nextEvent: {
    type: Sequelize.JSON,
  },
})

module.exports = UserGroups
