import Airtable from 'airtable'

var base = new Airtable({
  apiKey: process.env.VUE_APP_AIRTABLE_API_KEY
}).base('app26Q7TL0rEnifQE')

export default base
