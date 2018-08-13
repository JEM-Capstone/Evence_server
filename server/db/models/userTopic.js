const Sequelize = require('sequelize')
const db = require('../db')

const UserTopic = db.define('userTopic')

module.exports = UserTopic
