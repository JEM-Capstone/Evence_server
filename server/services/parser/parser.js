const fuzzysearch = require('fuzzysearch')

const {dictionary, commonWords} = require('./dictionary')

const { testSummary, testHeadline } = require('./testData.js')


// check our dictionary for keyword matches
/*eslint complexity: 1*/
const checkDictionary = (summaryArr, obj = {}) => {
  for (let i = 0; i < summaryArr.length; i++) {
    let word = summaryArr[i]
    if (!commonWords[word]) {
      /* eslint guard-for-in: off */
      for (let key in dictionary) {
        // check to make sure that the words aren't completely different lenghths
        // if they are, you are apt to get matches between pairs like "code" & "application development"
        let lengthDiff = word.length > key.length ? word.length - key.length : key.length - word.length
        if (lengthDiff < 3) {
          if (fuzzysearch(word, key) || fuzzysearch(key, word)) {
            let currWord = dictionary[key]
            if (!obj[currWord]) obj[currWord] = 1
            else obj[currWord] = obj[currWord] + 1
          }
        }
      }
    }
  }
  return obj
}

// find sort the categories
// Returns an array of arrays
const sortCategories = obj => {
  let sorted = []
  for (let key in obj) {
    sorted.push([key, obj[key]])
  }
  sorted.sort((a, b) => {
    return b[1] - a[1]
  })
  return sorted
}


// any multiple word string gets a plus in place of any whitespace for compatibility with meetup's api...
const formatCategory = str => str.split(' ').join('+')

// GET THE TOP CATEGORIES:
// 1) takes an array of sorted arrays
// 2) returns an array of strings
const getTopCategories = (arr, numCategories = arr.length) => {
  let topCategories = []
  // if there aren't enough categories to actually warrant a filter...
  if (arr.length <= numCategories) {
    arr.forEach(cat => {
      // topCategories.push(cat[0])
      topCategories.push(formatCategory(cat[0]))
    })
  } else {
    for (let i=0; i<numCategories; i++) {
      // any multiple word string gets a plus in place of any whitespace for compatibility with meetup's api...
      // let word = arr[i][0].split(' ').join('+')
      // let word = formatCategory(arr[i][0])
      topCategories.push(formatCategory(arr[i][0]))
    }
  }
  return topCategories
}


const parser = (summary, headline, numCategories) => {
  // if summary and headline aren't already strings, make them strings
  if (summary === null) summary = ''
  if (headline === null) headline = ''
  // format string data and put it into an array
  const summaryArr = summary.toLowerCase().split(' ').concat(headline.toLowerCase().split(' '))
  // make an object holding selected categories
  let selectedCategories = checkDictionary(summaryArr)
  // sort the categories
  let sortedCategories = sortCategories(selectedCategories)
  let getCategories
  // invoke with numCategories if it has been passed into the parser function call
  if (numCategories) getCategories = getTopCategories(sortedCategories, numCategories)
  // ... otherwise don't pass in numCategories
  else getCategories = getTopCategories(sortedCategories)
  return getCategories
}

console.log('PARSER TEST:', parser(testSummary, testHeadline))


module.exports = parser
