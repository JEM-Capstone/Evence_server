const User = require('./user')
const UserTopic = require('./userTopic')
const UserGroup = require('./userGroup')
const UserEvent = require('./userEvent')
const Rsvp = require('./rsvp')

User.hasMany(UserTopic)
UserTopic.belongsTo(User)

User.hasMany(UserGroup)
UserGroup.belongsTo(User)

User.hasMany(UserEvent)
UserEvent.belongsTo(User)


module.exports = {
  User, UserTopic, UserGroup, UserEvent, Rsvp
}
