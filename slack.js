const { App } = require('@slack/bolt');
const axios = require('axios');
require('dotenv').config();
const app = new App({
  token:process.env.YOUR_SLACK_BOT_TOKEN,
  signingSecret:process.env.YOUR_SLACK_SIGNING_SECRET,
});

app.message(async ({ message, say }) => {
 
  // const urlRegex = /(http[s]?:\/\/[^\s]+)/;
  // const match = message.text.match(urlRegex);

<<<<<<< HEAD
  if (match) {
    const url = match[0];

 
    const response = await axios.post('https://slack-url-shortner-by-prashant.onrender.com/url/', { url });


    console.log(response,"testing.....")

    // const res= await axios.get(`https://slack-url-shortner-by-prashant.onrender.com/url/:${response.data.shortId}`)

   
    await say(`Shortened URL: https://slack-url-shortner-by-prashant.onrender.com/url/${response.data.id}`);
  }
=======
  // if (match) {
  //   const longUrl = match[0];

 
    const response = await axios.post('https://slack-url-shortner-by-prashant.onrender.com/url/', { message });

   
    await say(`Shortened URL: https://slack-url-shortner-by-prashant.onrender.com/url/${response.data.shortUrl}`);
  // }
>>>>>>> 0d1fc6e80ba8fcbef62d11d8f17b65400faf018e
});

(async () => {
  await app.start(3000);

  console.log('⚡️ Bolt app is running!');
})();  
