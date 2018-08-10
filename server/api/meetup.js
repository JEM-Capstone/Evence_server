const router = require(`express`).Router();
const chalk = require(`chalk`);
const axios = require('axios')


/* composeRequest broken down =>
const { results } = 'https://api.meetup.com' + '/2/categories' + '?' + 'key=425d347f87c647b636645757a406' + '&sign=true' + '&page=5' */

//NOTE: eventually need to hide the key e.g. will become fs.readFileSync('api_key.txt', 'utf-8');

const composeRequest = (method, qualifiers, base = 'https://api.meetup.com', key = '425d347f87c647b636645757a406') => {
  const request = base + method + '?key=' + key + '&sign=true' + qualifiers
  return request
}

// api/meetup/categories
router.get(`/categories`, async (req, res, next) => {
  try {
    // will need to get request specifics from the req.body here, once hooked up to front end
    const method = `/2/categories` // stand-in data
    const qualifiers = '&page=7' // stand-in data
    const { data: { results } } = await axios.get(composeRequest(method, qualifiers))
    console.log(chalk.magenta(`gettin stuff from meetup.com....`));
    res.json(results)
  } catch (err) {
    console.log(chalk.red(err));
    res.status(500).send(err);
  }
});

module.exports = router;


// >>>>>>>>>>>> NOTES <<<<<<<<<<<<<<< //

/* recommend by both QUALITY & RELEVANCE to the user */
// if not enough, can use GET /:urlname/similar_groups */

// console.log(composeRequest('/2/categories', '&page=5'))
