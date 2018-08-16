const axios = require('axios')

const meetupCall = async (keywordArr, userId) => {
  const finishedCall = await function() {
    for (const keyword of keywordArr) {
      try {
        axios.get(
          `http://localhost:8080/api/meetup/topics/${keyword}/${userId}`
        )
        // console.log('db filled', finishedCall)
      } catch (err) {
        console.log(err)
      }
    }
  }
  finishedCall(keywordArr, userId)
  console.log('db filled', finishedCall())
}

module.exports = meetupCall
