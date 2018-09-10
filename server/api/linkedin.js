const router = require(`express`).Router()
const chalk = require(`chalk`)
const axios = require('axios')
const {User} = require('../db/models')

const composeRequest = (
  method,
  qualifiers,
  base = 'https://api.linkedin.com/v2',
  key
) => {
  const request = base + method + qualifiers
  return request
}

//api/linkedin/companies by keywords
router.get('/companies', async (req, res, next) => {
  try {
    //anticipating an array of keywords from the user found by front end passing back user.id
    const user = User.findById(req.user.id)
    const keywords = user.keywords.join('%20')
    const method = `/search?q=companiesV2&baseSearchParams.keywords=`
    const qualifiers = keywords
    const {data: {results}} = await axios({
      method: 'get',
      url: composeRequest(method, qualifiers),
      params: {'Content-Type': 'application/json'},
      headers: {header1: user.linkedinToken}
    })
    console.log(chalk.magenta(`getting companies from linkedin`))
    res.json(results)
  } catch (err) {
    console.log(chalk.red(err))
    res.status(500).send(err)
  }
})
