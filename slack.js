const { App } = require('@slack/bolt');
const axios = require('axios');
require('dotenv').config();
const app = new App({
  token:process.env.YOUR_SLACK_BOT_TOKEN,
  signingSecret:process.env.YOUR_SLACK_SIGNING_SECRET,
});



app.message(async ({ message, say }) => {
  const urlRegex = /(https?:\/\/[^\s]+)/;
  const match = message.text.match(urlRegex);
  if (match) {
    const longUrl = match[0];
    try {
      const response = await axios.post('https://slack-url-shortner-by-prashant.onrender.com//shorten', { longUrl });
      await say(`Shortened URL: ${response.data.shortUrl}`);
    } catch (error) {
      console.error('Error:', error.response.data.error);
      await say('Failed to shorten URL. Please try again later.');
    }
  }
});

(async () => {
  await app.start(3000);
  console.log('Bot is running...');
})(); 
