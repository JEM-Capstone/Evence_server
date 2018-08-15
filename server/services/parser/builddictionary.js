const dictionary = {}

const build = {
  // arts: ['painting', 'drawing', 'scultping', 'pottery', 'music'],
  // books: ['fiction', 'nonfiction', 'novels', 'biography', 'library', 'reading', 'writing'],
  business: ['marketing', 'finance', 'office', 'corporate', 'startup', 'career', 'entrepreneur'],
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
  computer: {
      games: ['video', 'gaming', 'gamer', 'player'],
      hardware: ['motherboar', 'harddrive', 'repair', 'ram', 'card', 'disk'],
      networking: ['cable', 'LAN', 'modem', 'router', 'internet' ],
      software: ['programming', 'coding', 'javascript', 'python', 'react',
      'program', 'reactnative', 'express', 'node', 'css', 'client',
      'frontend', 'backend', 'fullstack', 'develop', 'developer',
      'applications', 'app', 'apps', 'developing', 'engineer', 'js',
      'design', 'node.js', 'postgres', 'database', 'postico', 'mongo',
      'mongodb', 'build'],
      network : {
        security: ['firewall', 'proxy', 'antivirus', 'malware', 'virus', 'infected', 'hacker', 'attck', 'ddos', 'xss']
      }
  },
  tech: ['computers', 'programming', 'code', 'coding'],
  // writing: ['author', 'readers', 'articles'],
}

const builder = (build, parentWord = '') => {
  for (let key in build) {
    if(!Array.isArray(build[key])) {
      let word = `${parentWord} ${key}`
      builder(build[key], word)
    }
    else {
      let parent = `${parentWord} ${key}`.slice(1)
      if (parentWord.length > 0) dictionary[key] = parent

      // else dictionary[key] = key
      else dictionary[key] = parent
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

const builder1 = (obj) => {
  for (let key in build) {
    if(!Array.isArray(build[key])) {
      builder(build[key])
    }
    else {
      dictionary[key] = key
      build[key].forEach(word => {
        if (!dictionary[word]) dictionary[word] = key
      })
    }
  }
}

// builder(build)


console.log(dictionary)

commonWords = {}

commonWordsArr = ["the", "of", "and", "a", "to", "in", "is", "you", "that", "it",
                  "he", "was", "for", "on", "are", "as", "with", "his", "they", "I",
                  "at", "be", "this", "have", "from", "or", "one", "had", "by", "word",
                  "but", "not", "what", "all", "were", "we", "when", "your", "can", "said",
                  "there", "use", "an", "each", "which", "she", "do", "how", "their", "if",
                  "will", "up", "other", "about", "out", "many", "then", "them", "these",
                  "so", "some", "her", "would", "make", "like", "him", "into", "time", "has",
                  "look", "two", "more", "write", "go", "see", "number", "no", "way", "could",
                  "people", "my", "than", "first", "water", "been", "call", "who", "oil", "its",
                  "now", "find", "long", "down", "day", "did", "get", "come", "made", "may", "part", "Hi",
                "I'm", "hand", "used", "list", "two", "be", "also", "really", "use", "am", "highly", 'very',
                "you", "work", "something", "from", "where", "some", "something"]


commonWordsArr.forEach(word => {
  if (!commonWords[word]) commonWords[word] = true
})

// console.log(commonWords)

// const idustries = {
// Accounting: [],
// // Airlines/Aviation: [],
// Alternative Dispute Resolution: [],
// Alternative Medicine: [],
// Animation: [],
// Apparel Fashion: [],
// Architecture Planning: [],
// Arts and Crafts: [],
// Automotive: [],
// Aviation Aerospace: [],
// Banking: [],
// Biotechnology: [],
// Broadcast Media: [],
// Building Materials: [],
// Business Supplies and Equipment: [],
// Capital Markets: [],
// Chemicals: [],
// Civic Social Organization: [],
// Civil Engineering: [],
// Commercial Real Estate: [],
// computer network security: [*],
// computer games: [*],
// computer hardware: [*],
// computer networking: [*],
// computer software: [*],
// Construction: [],
// Consumer Electronics: [],
// Consumer Goods: [],
// Consumer Services: [],
// Cosmetics: [],
// Dairy: [],
// Defense Space: [],
// Design: [],
// Education Management: [],
// E-Learning: [],
// Electrical/Electronic Manufacturing: [],
// Entertainment: [],
// Environmental Services: [],
// Events Services: [],
// Executive Office: [],
// Facilities Services: [],
// Farming: [],
// Financial Services: [],
// Fine Art: [],
// Fishery: [],
// Food &amp; Beverages: [],
// Food Production: [],
// Fund-Raising: [],
// Furniture: [],
// Gambling Casinos: [],
// Glass, Ceramics &amp; Concrete: [],
// Government Administration: [],
// Government Relations: [],
// Graphic Design: [],
// Health, Wellness and Fitness: [],
// Higher Education: [],
// Hospital Health Care: [],
// Hospitality: [],
// Human Resources: [],
// Import and Export: [],
// Individual &amp; Family Services: [],
// Industrial Automation: [],
// Information Services: [],
// Information Technology and Services: [],
// Insurance: [],
// International Affairs: [],
// International Trade and Development: [],
// Internet: [],
// Investment Banking: [],
// Investment Management: [],
// Judiciary: [],
// Law Enforcement: [],
// Law Practice: [],
// Legal Services: [],
// Legislative Office: [],
// Leisure, Travel &amp; Tourism: [],
// Libraries: [],
// Logistics and Supply Chain: [],
// Luxury Goods Jewelry: [],
// Machinery: [],
// Management Consulting: [],
// Maritime: [],
// Marketing and Advertising: [],
// Market Research: [],
// Mechanical or Industrial Engineering: [],
// Media Production: [],
// Medical Devices: [],
// Medical Practice: [],
// Mental Health Care: [],
// Military: [],
// Mining Metals: [],
// Motion Pictures and Film: [],
// Museums and Institutions: [],
// Music: [],
// Nanotechnology: [],
// Newspapers: [],
// Nonprofit Organization Management: [],
// Oil Energy: [],
// Online Media: [],
// Outsourcing/Offshoring: [],
// Package/Freight Delivery: [],
// Packaging and Containers: [],
// Paper Forest Products: [],
// Performing Arts: [],
// Pharmaceuticals: [],
// Philanthropy: [],
// Photography: [],
// Plastics: [],
// Political Organization: [],
// Primary/Secondary Education: [],
// Printing: [],
// Professional Training &amp; Coaching: [],
// Program Development: [],
// Public Policy: [],
// Public Relations and Communications: [],
// Public Safety: [],
// Publishing: [],
// Railroad Manufacture: [],
// Ranching: [],
// Real Estate: [],
// Recreational Facilities and Services: [],
// Religious Institutions: [],
// Renewables &amp; Environment: [],
// Research: [],
// Restaurants: [],
// Retail: [],
// Security and Investigations: [],
// Semiconductors: [],
// Shipbuilding: [],
// Sporting Goods: [],
// Sports: [],
// Staffing and Recruiting: [],
// Supermarkets: [],
// Telecommunications: [],
// Textiles: [],
// Think Tanks: [],
// Tobacco: [],
// Translation and Localization: [],
// Transportation/Trucking/Railroad: [],
// Utilities: [],
// Venture Capital Private Equity: [],
// Veterinary: [],
// Warehousing: [],
// Wholesale: [],
// Wine and Spirits: [],
// Wireless: [],
// Writing and Editing: []
// }
