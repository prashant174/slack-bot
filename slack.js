const { App } = require('@slack/bolt');
const axios = require('axios');
require('dotenv').config();

const app = new App({
  token: process.env.YOUR_SLACK_BOT_TOKEN,
  signingSecret: process.env.YOUR_SLACK_SIGNING_SECRET,
});

app.message(async ({ message, context }) => {
  const urlRegex = /(https?:\/\/[^\s]+)/;
  const match = message.text.match(urlRegex);
  
  if (match) {
    const longUrl = match[0];

    try {
      const response = await axios.post('https://slack-url-shortner-by-prashant.onrender.com/shorten', { longUrl });
      const shortUrl = response.data.shortUrl;

      // Send the shortened URL as a message to the channel where the original message was posted
      await app.client.chat.postMessage({
        token: context.botToken,
        channel: message.channel,
        text: `Shortened URL: ${shortUrl}`,
      });
    } catch (error) {
      console.error('Error:', error.response.data.error);
      await app.client.chat.postMessage({
        token: context.botToken,
        channel: message.channel,
        text: 'Failed to shorten URL. Please try again later.',
      });
    }
  }
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('Bot is running...');
})();
