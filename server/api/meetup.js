const router = require(`express`).Router();
const { User, Topic, UserGroup, UserEvent } = require(`../db/models/index`);
const chalk = require(`chalk`);
const axios = require('axios')

/* if you have questions about these routes, ask Evelyn */


//NOTE: eventually need to hide the key e.g. fs.readFileSync('api_key.txt', 'utf-8');

// helper function for putting together https requests
const composeRequest = (method, qualifiers, base = 'https://api.meetup.com', key = '425d347f87c647b636645757a406') => {
  const request = base + method + '?key=' + key + '&sign=true' + qualifiers
  return request
}


// api/meetup/ping
router.get(`/ping`, async (req, res, next) => {
  console.log("hitting this!!!!");
const pong = 'pong'
res.json({ pong })
});

// api/meetup/topics
router.get(`/topics/:keyword/:userId`, async (req, res, next) => {
  try {
    const keyword = req.params.keyword
    const userId = req.params.userId
    //^^^ NOTE: will need to use a regex to transform spaces between keyword phrases into "+" here or before it even gets here

    const method = `/find/topics`
    const qualifiers = `&query=${keyword}&page=10&only=group_count,name,id`

    console.log(chalk.green(`gettin stuff from meetup.com....`));
    console.log(chalk.bgBlue(`querying endpoint: ${composeRequest(method, qualifiers)}`));
    const { data } = await axios.get(composeRequest(method, qualifiers))

    // keep only topic id that have associated group_counts > 50
    const filteredData = data.filter(item => item.group_count > 50)
    // grab only the ids for the DB
    const topicArray = filteredData.map(item => item.id)

    if (topicArray.length) {
      const [ topics, wasCreated ] = await Topic.findOrCreate({
        where: { keyword: keyword },
        defaults: {topics: topicArray}
      })
      console.log(chalk.magenta('Saving the following topic ids to the DB:', JSON.stringify(topics)));
    } else (console.log(chalk.magenta('No active topics found for this keyword')))

    res.json(data)
  } catch (err) {
    console.log(chalk.red(err));
    res.status(500).send(err);
  }
});


// api/meetup/groups
// we'll need to hit this endpoint multiple times, once for each topicId
router.get(`/groups/:topicId/:city/:userId`, async (req, res, next) => {
  try {
    const topicId = req.params.topicId //'16325'
    const userCity = req.params.city //'Chicago'
    const method = `/find/groups`
    const qualifiers = `&upcoming_events=true&fallback_suggestions=true&location=${userCity}&topic_id=${topicId}
    &radius=smart&page=10&only=next_event,members,urlname,name,id`
    //^^^looks like their "next_event=true" doesn't always work as intended so may need to filter on our end b4 saving to db

    console.log(chalk.green(`gettin stuff from meetup.com....`));
    console.log(chalk.bgBlue(`querying endpoint: ${composeRequest(method, qualifiers)}`));
    const { data } = await axios.get(composeRequest(method, qualifiers))

    // TODO: Save to DB along with user ID
    // Make sure that eventId getter method on the model is working....

    res.json(data)
  } catch (err) {
    console.log(chalk.red(err));
    res.status(500).send(err);
  }
});


// api/meetup/event
router.get(`/event/:group/:eventId/:userId`, async (req, res, next) => {
  try {
    const groupUrlName = req.params.group //'sketch_up'
    const eventId = req.params.eventId //'252570431'
    const method = `/${groupUrlName}/events/${eventId}`
    const qualifiers = '&fields=rsvp_sample,event_hosts,fee,web_actions,past_event_count_inclusive,featured_photo'
    /* ^^^added in useful fields from API documentation. RSVP sample may be necessary if group is private and
    can't see full attendence list(if we can see if someone is in-network to the user) */
    console.log(chalk.green(`gettin stuff from meetup.com....`));
    console.log(chalk.bgBlue(`querying endpoint: ${composeRequest(method, qualifiers)}`));

    const { data } = await axios.get(composeRequest(method, qualifiers))

    //TODO: Save to DB

    res.json(data)
  } catch (err) {
    console.log(chalk.red(err));
    res.status(500).send(err);
  }
});

// api/meetup/rsvps
router.get(`/rsvps/:group/:eventId/:userId`, async (req, res, next) => {
  try {
    const groupUrlName = req.params.group // 'UXSCHICAGO'
    const eventId = req.params.eventId // '253358683'
    const method = `/${groupUrlName}/events/${eventId}/rsvps`
    const qualifiers = '&order=name&only=member'
    /* ^^^will need to filter for those that have names, and for those with first AND last name listed before sending
    to linkedIn to see if they are connected to the user */
    console.log(chalk.green(`gettin stuff from meetup.com....`));
    console.log(chalk.bgBlue(`querying endpoint: ${composeRequest(method, qualifiers)}`));

    const {data} = await axios.get(composeRequest(method, qualifiers))

    //TODO: send to LinkeIn API to check if anyone is within 1-2 levels of connection w/ user

    res.json(data)
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
