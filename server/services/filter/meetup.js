const testData = require('./data')

// filter topics based on group_count and number_count
const topicFilter = (topicsArr, minGroupCount, minMemberCount) => {
  let filtered = topicsArr.filter(topic => {
    return topic.group_count > minGroupCount && topic.member_count > minMemberCount
  })
  return filtered
}

// sort topics based on member count
const topicSort = (topicArr) => {
  return topicArr.sort((a, b) => {
    return b.member_count - a.member_count
  })
}

let res = topicFilter(testData, 0, 10000)
let sorted = topicSort(res)
console.log(testData.length, sorted.length)

module.exports = { topicFilter }
