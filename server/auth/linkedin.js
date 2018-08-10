const router = require('express').Router()
const passport = require('passport')
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy
const {User} = require('../db/models')

module.exports = router

const linkedinConfig = {
  clientID: '867abnxmxsh4a0',
  clientSecret: 'R5xYPXLjHE6BVNBj',
  callbackURL: '/auth/linkedin/callback',
  scope: ['r_emailaddress', 'r_basicprofile'],
  state: true
}
const strategy = new LinkedInStrategy(
  linkedinConfig,
  (accessToken, refreshToken, profile, done) => {
    const linkedinId = profile.id
    const name = profile.name
    const email = profile.emails[0].vaule
    console.log(profile)

    User.findOrCreate({
      where: {linkedinId},
      defaults: {name, email}
    })
      // asynchronous verification, for effect...
      .then(() => {
        done(null, profile)
      })
      .catch(done)
  }
)

passport.use(strategy)

router.get('/', passport.authenticate('linkedin'), function(req, res) {
  // The request will be redirected to LinkedIn for authentication, so this
  // function will not be called.
})

router.get(
  '/callback',
  passport.authenticate('linkedin', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
)
