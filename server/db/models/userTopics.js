const Sequelize = require('sequelize')
const db = require('../db')

/* for each keyword from a user's profile, there will be a set of topics that come back
from the meetup API. they will be stored in the db with an association to that user's ID since
these won't change or need to be queried very often */

const UserTopics = db.define('userTopics', {
  keyword1: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    allowNull: true
  },
  keyword2: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    allowNull: true
  },
  keyword3: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    allowNull: true
  },
  keyword4: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    allowNull: true
  },
  keyword5: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    allowNull: true
  },
  keyword6: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    allowNull: true,
  },
  keyword7: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    allowNull: true,
  }
})

module.exports = UserTopics
