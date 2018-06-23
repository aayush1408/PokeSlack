const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
    token:'xoxb-386225781716-386596628485-tRUKL7olfj3JqrCEzD8DLKhK',
    name:'Pokebot'
});

bot.on('start',()=>{
    let params = {
        icon_emoji:':smiley:'
    };
    bot.postMessageToChannel('general', 'Ask me all about your favourite pokemon!', params); 
});

bot.on('error',(err)=>{
    console.log(err);
});

//Message handler
bot.on('message',data =>{
    if (data.type !== "message") {
        return;
    }
    console.log('I am the first event');
    handleMessage(data.text);
});

function handleMessage(message){
    console.log('handle message');
    if(message){
        getPokemon(message);
    }
}

async function getPokemon(pokemon){
    console.log('I am astync func');
    let params = {
        icon_emoji:':sad:'
    };
    const res = await axios(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    secondQuestion(res.data);      
}

function secondQuestion(pokemon){
    console.log('Second ques');    
    let params = {
        icon_emoji:':smiley:'
    };
    bot.postMessageToChannel('general',`Okay, What you want to know about ${pokemon.name}?`,params);
    bot.on('message',data =>{
        if(data.type !== 'message'){
            return;
        }
        console.log('Second event');    
        if(data.text.includes('height')){
            getDetails(data.text,pokemon)
        }
    });
}

function getDetails(character,pokemon){
    console.log('Get details');
    let params = {
        icon_emoji:':smiley:'
    };
    let stats = pokemon[character];
    bot.postMessageToChannel('general',`The ${character} of the ${pokemon.name} is ${stats}`,params);    
}