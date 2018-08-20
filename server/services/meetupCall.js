const axios = require('axios')
const {UserGroup} = require('../db/models')

const topicsCall = async (keywordArr, userId) => {
  // const finishedCall = await function() {
  let topicArray = []
  console.log('topic array initialized')
  for (const keyword of keywordArr) {
    console.log('starting for of loop', keyword, userId)
    try {
      const {data} = await axios.get(
        `http://localhost:8080/api/meetup/topics/${keyword}/${userId}`
      )
      console.log('db filled', data)
      topicArray = topicArray.concat(data)
      console.log('full array of all keys', topicArray)
    } catch (err) {
      console.log(err)
    }
  }
  console.log('should be full', topicArray)
  return topicArray
  // }
  // const result = await finishedCall(keywordArr, userId)
}

const eventsCall = async (groupEventArr, userId) => {
  // console.log('big array of groups', groupEventArr)
  // const finishedCall = await function() {
  for (let i = 0; i < groupEventArr.length; i++) {
    ;(function(index) {
      setTimeout(() => {
        try {
          axios.get(
            `http://localhost:8080/api/meetup/events/${
              groupEventArr[i].dataValues.urlName
            }/${groupEventArr[i].dataValues.nextEventId}/${userId}`
          )
        } catch (err) {
          console.log(err)
        }
      }, 1000 + 500 * index)
    })(i)
    console.log(
      'adding entry:',
      groupEventArr[i].dataValues.urlName,
      groupEventArr[i].dataValues.nextEventId
    )
  }
  // }
  // finishedCall(urlName, eventId, userId)
  console.log('db filled with events')
}

// let groupEventArr = []
const groupsCall = (idArr, city, userId) => {
  for (let i = 0; i < idArr.length; i++) {
    ;(function(index) {
      setTimeout(() => {
        try {
          axios.get(
            `http://localhost:8080/api/meetup/groups/${
              idArr[i]
            }/${city}/${userId}`
          )
          // const convertedData = data.map(group => {
          //   return [group.urlname, group.next_event.id]
          // })
          // console.log('this is the data', convertedData)
          // groupEventArr = groupEventArr.concat(convertedData)
          // console.log('this is the group event arr', groupEventArr)

          // console.log('this is the event info', data[i].next_event.id)
        } catch (err) {
          console.log(err)
        }
      }, 1000 + 500 * index)
    })(i)
  }
  setTimeout(async () => {
    try {
      const groupEventData = await UserGroup.findAll({
        // through: {
        attributes: ['urlName', 'nextEventId'],
        where: {userId: userId}
        // }
      })
      console.log('this should be the db pull', groupEventData[0].dataValues)
      return eventsCall(groupEventData, userId)
    } catch (err) {
      console.log(err)
    }
  }, 1000 + 500 * idArr.length + 1)
}

// console.log(groupEventData)
// }
// }
// const data = finishedCall(idArr, city, userId)
// console.log('big array of groups', groupEventArr)
// }

module.exports = {topicsCall, groupsCall}
