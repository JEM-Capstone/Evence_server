const fuzzysearch = require('fuzzysearch')

const { dictionary, commonWords } = require('./dictionary')

const summary = "Hi, I’m Matt! I am a Fullstack Engineer with a keen eye for design and a knack for creativity. I used to be a full time musician but realized that I really loved taking on the daily challenges that coding presents. As a musician, I learned that creating something shouldn’t be hindered by what you have to work with. I embrace the tools at hand and work to design and build something beautiful. I use Node, Express, Postgres, React, React-Native, JavaScript & CSS. (The list continues to grow.) I’m also a songwriter and music theory nerd. (Guitar & pedal steel if your interested.) My main motivation is to build things people love. Gluing together creativity and resourcefulness to make something truly useful."

// const summary = "I am a driven, creative, and highly motivated new fullstack developer looking to create unique and innovative applications for the consumer market. I come from a traditional office background where I constantly desired to solve problems by developing dynamic tools using common office software. It was when I was prohibited to use these tools that I realized I should be making solutions full time. I took the step to change my life and discover how much there was to learn during my time in a fullstack immersive program. I see applications as a logical 'next step' in productivity advancement and improvement. That is why intend to bring my experience and creativity to bare in this exciting industry."


const headline = "Fullstack Web Developer with A Keen Eye for Design"
// const headline = "Student at Fullstack Academy of Code Chicago"
// const headline = null

// const summaryArr = summary.toLowerCase().split(' ').concat(headline.toLowerCase().split(' '))

// console.log('summary arr:', summaryArr)

// console.log(fuzzysearch('react', 'react'))



// check our dictionary for keyword matches
const checkDictionary = (summaryArr, obj = {}) => {
  for (let i=0; i<summaryArr.length; i++) {
    let word = summaryArr[i]
    if (!commonWords[word]) {
      console.log('t:', word)
      // console.log('word:', word);
      for (let key in dictionary) {
        // if (fuzzysearch('express', key)) console.log('WHOOOOO:', word,);
        // check to make sure that the words aren't completely different lenghths
        // if they are, you are apt to get matches between pairs like "code" & "application development"
        let lengthDiff = word.length > key.length ? word.length - key.length : key.length - word.length
        // console.log(word, key);
        if (lengthDiff < 3) {
          if (fuzzysearch(word, key) || fuzzysearch(key, word)) {
            console.log(word, key)
            let currWord = dictionary[key]
            if (!obj[currWord]) obj[currWord] = 1
            else obj[currWord] = obj[currWord] + 1
          }
        }
      }
    }
  }
  // console.log('checkDictionary', obj)
  return obj
}

// find sort the categories
// Returns an array of arrays
const sortCategories = (obj) => {
  let sorted = []
  for (let key in obj) {
    sorted.push([key, obj[key]])
  }
  sorted.sort((a, b) => {
    return b[1] - a[1]
  })
  console.log('sorted:', sorted)
  return sorted
}

// get the top categories
// takes an array of sorted arrays
// returns an array of strings
// any multiple word string gets a plus in place of any whitespace for compatibility with meetup's api
const getTopCategories = (arr, numCategories = arr.length) => {
  let topCategories = []

  if (arr.length <= numCategories) {
    arr.forEach(cat => topCategories.push(cat[0])) // if there aren't enough categories to actually warrant a filter
  } else {
    for (let i=0; i<numCategories; i++) {
      // let regex = /\s*/
      // let word = arr[i][0].replace(regex, '+')
      // console.log(word)
      // make a regex to check AGAINST
      // replace whitespace with +
      // string.replace

      let word = arr[i][0].split(' ').join('+')
      topCategories.push(word)
    }
  }
  return topCategories
}

const parser = (summary, headline, numCategories) => {
  if (summary === null) summary = ''
  if (headline === null) headline = ''
  const summaryArr = summary.toLowerCase().split(' ').concat(headline.toLowerCase().split(' '))
  let selectedCategories = checkDictionary(summaryArr)
  let sortedCategories = sortCategories(selectedCategories)
  let getCategories
  if (numCategories) getCategories = getTopCategories(sortedCategories, numCategories) // invoke with numCategories if it exists
  else getCategories = getTopCategories(sortedCategories) // ... otherwise don't pass in numCategories
  return getCategories
}


console.log('top', parser(summary, headline))

module.exports = parser
