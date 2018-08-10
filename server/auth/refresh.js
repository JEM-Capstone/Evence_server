var refresh = require('passport-oauth2-refresh')
const {User} = require('../db/models')

const refreshAccessToken = (req, res, next, linkedinAcct) => {
  let accessToken
  refresh.requestNewAccessToken(
    'linkedin',
    linkedinAcct.refreshToken,
    process.env.LINKEDIN_CLIENT_ID,
    process.env.LINKEDIN_CLIENT_SECRET,

    async (err, refreshRes, body) => {
      if (err) return
      accessToken = body.access_token
      await linkedinAcct.update({accessToken, lastRefresh: Date.now()})
      req.user.accessToken = accessToken
      console.log('refresh complete')
      next()
    }
  )
}

const checkAccessToken = async (req, res, next) => {
  const linkedinAcct = await User.findOne({where: {linkedinId: req.user.id}})
  if (
    linkedinAcct &&
    (!linkedinAcct.lastRefresh ||
      Date.now() - linkedinAcct.lastRefresh > 2400000)
  ) {
    refreshAccessToken(req, res, next, linkedinAcct)
  } else {
    next()
  }
}

module.exports = {checkAccessToken, refreshAccessToken}
