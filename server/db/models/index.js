const User = require('./user')
const Topic = require('./topic')
const UserGroup = require('./userGroup')
const UserEvent = require('./userEvent')
const UserTopic = require('./userTopic')

// User.belongsToMany(Topic, {through: UserTopic })
// Topic.belongsToMany(User, {through: UserTopic })

// User.hasMany(UserGroup)
// UserGroup.belongsTo(User)

// User.hasMany(UserEvent)
// UserEvent.belongsTo(User)

module.exports = {
  User,
  Topic,
  UserGroup,
  UserEvent,
  UserTopic
}
