const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
    token:'xoxb-386225781716-386596628485-OPonxctT1GmPS8vrp4XzhCBu',
    name:'Pokebot'
});

bot.on('start',()=>{
    let params = {
        icon_emoji:':smiley:'
    };
    bot.postMessageToChannel('general', 'Ask me all about your favourite pokemon!', params);
    
})