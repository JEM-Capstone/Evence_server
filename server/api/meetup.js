const router = require(`express`).Router()
const {
  User,
  Topic,
  UserGroup,
  UserEvent,
  UserTopic
} = require(`../db/models/index`)
const chalk = require(`chalk`)
const axios = require('axios')
const topicFilter = require('../services/index')

/* for questions about these routes, ask Evelyn */

//NOTE: eventually need to hide the key e.g. fs.readFileSync('api_key.txt', 'utf-8');

// helper function for putting together https requests
const composeRequest = (
  method,
  qualifiers,
  base = 'https://api.meetup.com',
  key = '501581a6f6f646d7f155b3b1f165a5d',
  altKey = '7b24331442236f47294c3555e126a75'
) => {
  const request = base + method + '?key=' + key + '&sign=true' + qualifiers
  return request
}

// api/meetup/ping (for testing connection to frontend)
router.get(`/ping`, (req, res, next) => {
  try {
    console.log(chalk.inverse('....backend reached'))
    const pong = 'pong'
    res.json({pong})
  } catch (err) {
    console.log(chalk.red(err))
  }
})

// api/meetup/topics ---> only drop after linkedIn auth token refresh ~60 days
router.get(`/topics/:keyword/:userId`, async (req, res, next) => {
  try {
    const keyword = req.params.keyword // going to recommend only have single word keywords
    const userId = req.params.userId

    const method = `/find/topics`

    const qualifiers = `&query=${keyword}&page=10&only=group_count,name,id`
    console.log('inside api... keyword and user id', keyword, userId)
    console.log(chalk.green(`gettin stuff from meetup.com....`))
    console.log(
      chalk.bgBlue(`querying endpoint: ${composeRequest(method, qualifiers)}`)
    )
    const {data} = await axios.get(composeRequest(method, qualifiers))

    // keep only topic id that have associated group_counts > 50
    const filteredData = data.filter(item => item.group_count > 20)
    console.log(
      chalk.red('this is our filteredData for groups over 200:', filteredData)
    )
    // grab only the ids for the DB
    const topicArray = filteredData.map(item => item.id)

    if (topicArray.length) {
      const [topics, wasCreated] = await Topic.findOrCreate({
        where: {keyword: keyword},
        defaults: {topics: topicArray}
      })
      const join = await UserTopic.findOrCreate({
        where: {userId: userId, topicId: topics.dataValues.id}
      })
      console.log(
        chalk.green(
          'Saving the following topic ids to the DB:',
          JSON.stringify(topics)
        )
      )
    } else
      console.log(
        chalk.yellow(
          'No active topics found for this keyword, not saving anything.'
        )
      )

    res.json(topicArray)
  } catch (err) {
    console.log(chalk.red(err))
    res.status(500).send(err)
  }
})

// api/meetup/groups --> drop table after ...?
// we'll need to hit this endpoint multiple times per person, once for each topicId
// each topidId creates miltiple instances of groups in the userGroups table
router.get(`/groups/:topicId/:city/:userId`, async (req, res, next) => {
  try {
    const topicId = req.params.topicId //'16325'
    const userCity = req.params.city //'Chicago' 'New+York' //NOTE '+'
    const method = `/find/groups`
    const qualifiers = `&upcoming_events=true&fallback_suggestions=true&location=${userCity}&topic_id=${topicId}
    &radius=smart&page=10&only=next_event,members,urlname,name,id`

    console.log(chalk.green(`gettin stuff from meetup.com....`))
    console.log(
      chalk.bgBlue(`querying endpoint: ${composeRequest(method, qualifiers)}`)
    )
    const result = await axios.get(composeRequest(method, qualifiers))
    // console.log(result.headers)
    const filteredData = result.data.filter(item => item.next_event) //their only=next_event isn't working

    // Save to DB along with user ID
    for (const item of filteredData) {
      await UserGroup.findOrCreate({
        //TODO: make this findOrCreate using groupId & userId so you don't get duplicates
        where: {groupId: item.id},
        defaults: {
          displayName: item.name,
          urlName: item.urlname,
          members: item.members,
          nextEventId: item.next_event.id,
          userId: req.params.userId
        }
      })
    }
    console.log(
      chalk.green(`groups may or may not have been saved to the database!`)
    )
    // console.log(filteredData)
    res.json(filteredData)
  } catch (err) {
    console.log(chalk.red(err))
    res.status(500).send(err)
  }
})

// api/meetup/events --> drop table after ...?
// will need to be called for each instance in groups table on that group's 'next event'
// all info needed for list & single event view (pull only what you need on front end)
router.get(`/events/:group/:eventId/:userId`, async (req, res, next) => {
  try {
    const groupUrlName = req.params.group //'sketch_up'
    const eventId = req.params.eventId //'252570431'
    const method = `/${groupUrlName}/events/${eventId}`
    const qualifiers =
      '&fields=event_hosts,fee,web_actions,past_event_count_inclusive,featured_photo,plain_text_no_images_description'
    console.log(chalk.green(`gettin stuff from meetup.com....`))
    console.log(
      chalk.bgBlue(`querying endpoint: ${composeRequest(method, qualifiers)}`)
    )

    const {data} = await axios.get(composeRequest(method, qualifiers))

    const event = await UserEvent.findOrCreate({
      //TODO: make this findOrCreate using eventId & userId so you don't get duplicates
      where: {eventId: data.id},
      defaults: {
        eventName: data.name,
        eventId: data.id,
        photo: data.featured_photo ? data.featured_photo.photo_link : null,
        eventGroup: data.group.name,
        date: data.local_date,
        time: data.local_time,
        eventCity: data.group.localized_location,
        rsvps: data.yes_rsvp_count,
        venueName: data.venue ? data.venue.name : null,
        venueAddress: data.venue ? data.venue.address_1 : null,
        fee: data.fee ? data.fee.amount : null,
        description: data.description,
        webActions: data.web_actions
          ? [
              data.web_actions.calendar_export_google,
              data.web_actions.calendar_export_ical,
              data.web_actions.calendar_export_outlook
            ]
          : null,
        directLink: data.link,
        pastEvents: data.past_event_count_inclusive
          ? data.past_event_count_inclusive
          : null,
        hosts: data.event_hosts
          ? data.event_hosts.map(host => [
              host.name,
              host.id,
              host.photo ? host.photo.photo_link : null
            ])
          : null,
        userId: req.params.userId
      }
    })

    console.log(
      chalk.green(`EVENT: "${event.eventName}" has been saved to the database!`)
    )
    res.json(data)
  } catch (err) {
    console.log(chalk.red(err))
    res.status(500).send(err)
  }
})

module.exports = router

// >>>>>>>>>> NOT YET IN USE >>>>>>>>>>>>>

// api/meetup/rsvps
router.get(`/rsvps/:group/:eventId/:userId`, async (req, res, next) => {
  try {
    const groupUrlName = req.params.group // 'UXSCHICAGO'
    const eventId = req.params.eventId // '253358683'
    const method = `/${groupUrlName}/events/${eventId}/rsvps`
    const qualifiers = '&order=name&only=member'
    /* ^^^will need to filter for those that have names, and for those with first AND last name listed before sending
    to linkedIn to see if they are connected to the user */
    console.log(chalk.green(`gettin stuff from meetup.com....`))
    console.log(
      chalk.bgBlue(`querying endpoint: ${composeRequest(method, qualifiers)}`)
    )

    const {data} = await axios.get(composeRequest(method, qualifiers))

    //TODO: send to LinkeIn API to check if anyone is within 1-2 levels of connection w/ user

    res.json(data)
  } catch (err) {
    console.log(chalk.red(err))
    res.status(500).send(err)
  }
})

module.exports = router
