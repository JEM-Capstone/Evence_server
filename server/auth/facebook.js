const router = require('express').Router()
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy

const {User} = require('../db/models')

module.exports = router

/**
 * For OAuth keys and other secrets, your Node process will search
 * process.env to find environment variables. On your production server,
 * you will be able to set these environment variables with the appropriate
 * values. In development, a good practice is to keep a separate file with
 * these secrets that you only share with your team - it should NOT be tracked
 * by git! In this case, you may use a file called `secrets.js`, which will
 * set these environment variables like so:
 *
 * process.env.GOOGLE_CLIENT_ID = 'your google client id'
 * process.env.GOOGLE_CLIENT_SECRET = 'your google client secret'
 * process.env.GOOGLE_CALLBACK = '/your/google/callback'
 */

const facebookConfig = {
  clientID: 245438696083547,
  clientSecret: 'bf313f2e33880f3b792df03eef2de534',
  callbackURL: 'http://localhost:3000/auth/facebook/callback'
}

const strategy = new FacebookStrategy(
  facebookConfig,
  (accessToken, refreshToken, profile, cb) => {
    User.findOrCreate(
      {
        facebookId: profile.id
      },
      function(err, user) {
        return cb(err, user)
      }
    )
  }
)

passport.use(strategy)

router.get(
  '/',
  passport.authenticate('facebook', {scope: ['email', 'user_birthday']})
) // need to review what info is being asked for

router.get(
  '/callback',
  passport.authenticate('facebook', {failureRedirect: '/login'}),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/')
  }
)
