const User = require('./user')
const UserTopics = require('./userTopics')
const UserGroups = require('./userGroups')
const UserEvents = require('./userEvents')
const RSVPs = require('./rsvps')

User.hasMany(UserTopics)
UserTopics.belongsTo(User)

User.hasMany(UserGroups)
UserGroups.belongsTo(User)

User.hasMany(UserEvents)
UserEvents.belongsTo(User)


module.exports = {
  User, UserTopics, UserGroups
}
