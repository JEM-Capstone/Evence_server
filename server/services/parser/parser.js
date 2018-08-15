const Fuse = require('fuse.js')
const fuzzysearch = require('fuzzysearch')

const { dictionary, commonWords } = require('./dictionary')

const summary1 = "Hi, I’m Matt! I am a Fullstack Engineer with a keen eye for design and a knack for creativity. I used to be a full time musician but realized that I really loved taking on the daily challenges that coding presents. As a musician, I learned that creating something shouldn’t be hindered by what you have to work with. I embrace the tools at hand and work to design and build something beautiful. I use Node, Express, Postgres, React, React-Native, JavaScript & CSS. (The list continues to grow.) I’m also a songwriter and music theory nerd. (Guitar & pedal steel if your interested.) My main motivation is to build things people love. Gluing together creativity and resourcefulness to make something truly useful."

const summary = "I am a driven, creative, and highly motivated new fullstack developer looking to create unique and innovative applications for the consumer market. I come from a traditional office background where I constantly desired to solve problems by developing dynamic tools using common office software. It was when I was prohibited to use these tools that I realized I should be making solutions full time. I took the step to change my life and discover how much there was to learn during my time in a fullstack immersive program. I see applications as a logical 'next step' in productivity advancement and improvement. That is why intend to bring my experience and creativity to bare in this exciting industry."

// const headline = "Fullstack Web Developer with A Keen Eye for Design"
const headline = "Student at Fullstack Academy of Code Chicago"

const summaryArr = summary.split(' ').concat(headline.split(' '))

// console.log(summaryArr)

var options = {
 shouldSort: true,
 includeScore: true,
 threshold: 0.5,
 location: 0,
 distance: 100,
 maxPatternLength: 32,
 minMatchCharLength: 2,
 keys: [
   "title",
   "author.firstName"
 ]
}

let word = 'yoga'
let obj = {}


const fuzmatch = (word, dictionary) => {
  for(let key in dictionary) {
    if(!Array.isArray(dictionary[key])) {
      fuzmatch(word, dictionary[key])
    }
    if (fuzzysearch(word, key)) {
      let currWord = dictionary[key]
      if (!obj[currWord]) obj[currWord] = 1
      else obj[currWord] = obj[currWord] + 1
    }
  }
}

const checkDictionary = (summaryArr) => {
  for (let i=0; i<summaryArr.length; i++) {
    let word = summaryArr[i]
    if (!commonWords[word]) {
      if()
      for (let key in dictionary) {
        // check to see if val is an array and if it isnt then recurse

        if (fuzzysearch(word, key)) {
          let currWord = dictionary[key]
          if (!obj[currWord]) obj[currWord] = 1
          else obj[currWord] = obj[currWord] + 1
        }
        else checkDictionary()
      }
    }
  }
}


console.log(obj)

// const parser = new Fuse(dictionary, options)
