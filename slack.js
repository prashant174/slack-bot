const {App}=require('@slack/bolt');
const axios=require('axios')
require('dotenv').config()


const app=new App({
    token:process.env.SLACK_BOT_TOKEN,
    signingSecret:process.env.SLACK_SIGNING_SECRET,
    appToken:process.env.SLACK_APP_TOKEN,
    socketMode:true,

});



app.command('/url', async ({ command, ack, say }) => {
    await ack();

    
    const urlFormat = /(https?:\/\/[^\s]+)/g;
    const urls = command.text.match(urlFormat);
    if (!urls ) {
        await say('No URL provided please enter long url');
        return;
    }
    const url = urls[0];

    try {
        
        const response = await axios.post('https://slack-url-shortner-by-prashant.onrender.com/url/', { url: url });

        
        // console.log(response.data.id)
        const shortId=response.data.id

        await say(`Hurray your short url created successfully : https://slack-url-shortner-by-prashant.onrender.com/url/${shortId}`);
    } catch (error) {
        console.error( error);
        await say('something went wrong please try again later');
    }
});

(async () => {
    await app.start(process.env.PORT || 3000);
    console.log(`app is running! on port ${process.env.PORT || 3000} `);
  })();
