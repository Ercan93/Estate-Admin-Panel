import Airtable from "airtable";

var base = new Airtable({
  apiKey: process.env.VUE_APP_AIRTABLE_API_KEY,
}).base(process.env.VUE_APP_AIRTABLE_TABLE_ID);

export default base;
