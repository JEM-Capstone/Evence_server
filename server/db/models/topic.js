const Sequelize = require('sequelize')
const db = require('../db')

// Many to many join table - Many users can have the same keyword/topics pair
// FindOrCreate to add to this table
// Join table w/ users will tell us what keyword/topics are associated with a user

const Topic = db.define('topic', {
  keyword: {
    type: Sequelize.STRING,
    allowNull: false
  },
  topics: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    allowNull: true
  },
})

module.exports = Topic
