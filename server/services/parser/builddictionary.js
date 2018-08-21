const dictionary = {}

/* --------------------------------------------------------------------------

    * WE WANT TO FILTER DOWN IMPORTANT WORDS DOWN TO A SMALLER LIST OF USEABLE WORDS
      WE KNOW QUERY WELL AGAINST MEETUP'S API
    * THE KEYS ARE THE SMALL LIST, THE ARRAYS ARE THE LONG LIST OF IMPORTANT WORDS
    * BUILDER TAKES BUILD AND MAKES A DICTIONARY THAT WE CAN QUERY AGAINS WITH THE PARSER

 -------------------------------------------------------------------------- */

const build = {
  // arts: ['painting', 'drawing', 'scultping', 'pottery', 'music'],
  // books: ['fiction', 'nonfiction', 'novels', 'biography', 'library', 'reading', 'writing'],
  // business: [
  //   'marketing',
  //   'finance',
  //   'office',
  //   'corporate',
  //   'startup',
  //   'career',
  //   'entrepreneur'
  // ],
  // auto: ['cars', 'trucks', 'motorcylce', 'automotive'],
  // community: ['local', 'volunteer', 'outreach', 'social', 'neighborhood'],
  // dancing: ['moderndance', 'ballet', 'lyrical', 'dancecompany', 'choreography', 'contemporarydance', 'hiphopdance'],
  // education: ['elementary', 'highschool', 'teacher', 'teaching', 'teach', 'professor'],
  // fashion: ['clothes', 'model', 'beauty', 'makeup', 'clothingdesign'],
  // fitness: ['health', 'exercise', 'workout', 'running', 'lifting', 'cardio', 'yoga', 'triathlon', 'biking', 'cycling'],
  // food: ['cook', 'cooking', 'chef', 'restaurant', 'dining', 'cuisine'],
  // drink: ['cocktails', 'coffee', 'bartending', 'barista', 'tea', 'beer', 'brewing', 'distilling', 'wine', 'sommelier'],
  // games: ['board games', 'video games', 'larping'],
  // movements: [],
  // health: ['doctor', 'nurse', 'surgeon', 'healthcare', 'hospital', 'clinic'],
  // crafts: [],
  // language: ['linguist', 'translate', 'bi-lingual'],
  // lgbt: ['gay', 'lesbian', 'transgender', 'queer', 'bisexual', 'asexual', 'gender', 'genderstudies'],
  // lifestyle: ['home', 'garden', 'travel'],
  // film: ['movies', 'screen', 'screenwriting', 'actor', 'filmdirector'],
  // music: ['musician', 'guitar', 'instrument', 'singer', 'producer', 'recording', 'audio', 'band', 'arranger', 'compose', 'piano', 'musictheory', 'orchestra', 'sympnony', 'opera', 'filmscore'],
  // spirituality: ['faith', 'religion', 'belief', 'rabbi', 'priest', 'pastor', 'god', 'church', 'pope', 'deacon', 'elder', 'cardinel'],
  // outdoors: ['hiking', 'backpacking', 'canoing', 'kayaking', 'mountain', 'foresting', 'forest', 'foraging', 'camping'],
  // paranormal: ['ghost', 'haunt', 'possesion'],
  // family: ['kids', 'children', 'husband', 'wife', 'mother', 'father', 'parent', 'grandparent'],
  // pets: ['dog', 'cat', 'exotic', 'animal', 'veterinary', 'species'],
  // photography: ['pictures', 'camera', 'photos', 'portrait', 'photographer'],
  // scifi: [],
  // social: [],
  // sports: ['ball', 'athlete', 'workout', 'referee', 'coach', 'player'],
  javascript: [
    'javascript',
    'reactnative',
    'express',
    'node',
    'js',
    'postgres',
    'node.js',
    'postico',
    'web',
    'app',
    'redux',
    'reactredux',
    '.js',
    'webdev',
    'mobile',
    'phone',
    'android',
    'ios',
    'css'
  ],
  computer: {
    games: ['video', 'gaming', 'gamer', 'player'],
    hardware: ['motherboar', 'harddrive', 'repair', 'ram', 'card', 'disk'],
    networking: ['cable', 'LAN', 'modem', 'router', 'internet'],
    software: [
      'programming',
      'coding',
      'python',
      'program',
      'frontend',
      'backend',
      'fullstack',
      'develop',
      'developer',
      'applications',
      'developing',
      'engineer',
      'design',
      'database',
      'mongo',
      'mongodb',
      'build'
    ],
    network: {
      security: [
        'firewall',
        'proxy',
        'antivirus',
        'malware',
        'virus',
        'infected',
        'hacker',
        'attck',
        'ddos',
        'xss'
      ]
    }
  }
  // tech: ['computers', 'programming', 'code', 'coding']
  // writing: ['author', 'readers', 'articles'],
}

const builder = (build, parentWord = '') => {
  for (let key in build) {
    if (!Array.isArray(build[key])) {
      let word = `${parentWord} ${key}`
      builder(build[key], word)
    } else {
      let parent = `${parentWord} ${key}`.slice(1)
      if (parentWord.length > 0) dictionary[key] = parent
      else
        // else dictionary[key] = key
        dictionary[key] = parent
      build[key].forEach(word => {
        // if (!dictionary[word]) dictionary[word] = key
        if (!dictionary[word]) dictionary[word] = parent
      })
    }
  }
}

builder(build)

// ---------------------------------------------
// NESTED BUILDER
// ---------------------------------------------

const builder1 = obj => {
  for (let key in build) {
    if (!Array.isArray(build[key])) {
      builder(build[key])
    } else {
      dictionary[key] = key
      build[key].forEach(word => {
        if (!dictionary[word]) dictionary[word] = key
      })
    }
  }
}

// builder(build)

console.log(dictionary)

const commonWords = {}

const commonWordsArr = [
  'the',
  'of',
  'and',
  'a',
  'to',
  'in',
  'is',
  'you',
  'that',
  'it',
  'he',
  'was',
  'for',
  'on',
  'are',
  'as',
  'with',
  'his',
  'they',
  'I',
  'at',
  'be',
  'this',
  'have',
  'from',
  'or',
  'one',
  'had',
  'by',
  'word',
  'but',
  'not',
  'what',
  'all',
  'were',
  'we',
  'when',
  'your',
  'can',
  'said',
  'there',
  'use',
  'an',
  'each',
  'which',
  'she',
  'do',
  'how',
  'their',
  'if',
  'will',
  'up',
  'other',
  'about',
  'out',
  'many',
  'then',
  'them',
  'these',
  'so',
  'some',
  'her',
  'would',
  'make',
  'like',
  'him',
  'into',
  'time',
  'has',
  'look',
  'two',
  'more',
  'write',
  'go',
  'see',
  'number',
  'no',
  'way',
  'could',
  'people',
  'my',
  'than',
  'first',
  'water',
  'been',
  'call',
  'who',
  'oil',
  'its',
  'now',
  'find',
  'long',
  'down',
  'day',
  'did',
  'get',
  'come',
  'made',
  'may',
  'part',
  'Hi',
  "I'm",
  'hand',
  'used',
  'list',
  'two',
  'be',
  'also',
  'really',
  'use',
  'am',
  'highly',
  'very',
  'you',
  'work',
  'something',
  'from',
  'where',
  'some',
  'something'
]

commonWordsArr.forEach(word => {
  if (!commonWords[word]) commonWords[word] = true
})

// console.log(commonWords)
