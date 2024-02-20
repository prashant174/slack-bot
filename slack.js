const { App } = require('@slack/bolt');
const axios = require('axios');
require('dotenv').config();
const app = new App({
  token:process.env.YOUR_SLACK_BOT_TOKEN,
  signingSecret:process.env.YOUR_SLACK_SIGNING_SECRET,
});

app.message(async ({ message, say }) => {
 
  const urlRegex = /(http[s]?:\/\/[^\s]+)/;
  const match = message.text.match(urlRegex);

  if (match) {
    const url = match[0];

 
    const response = await axios.post('https://slack-url-shortner-by-prashant.onrender.com/url/', { url });


    console.log(response,"testing.....")

    // const res= await axios.get(`https://slack-url-shortner-by-prashant.onrender.com/url/:${response.data.shortId}`)

   
    await say(`Shortened URL: https://slack-url-shortner-by-prashant.onrender.com/url/${response.data.id}`);
  }
});

(async () => {
  await app.start(3000);

  console.log('⚡️ Bolt app is running!');
})();  