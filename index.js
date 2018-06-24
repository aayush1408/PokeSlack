const SlackBot = require('slackbots');
const axios = require('axios');
const pokemon = require('pokemon');

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
    console.log(data);
    if (data.type !== "message" || data.subtype === 'bot_message' ){
        return;
    }
    else{
        handleMessage(data.text);
        console.log('Message');
    }
});

function handleMessage(message){
    console.log('handle message');
    var msg = message.split(' '); 
    console.log(msg);
        msg.map((word)=>{
            console.log(word);
            let newWord = word[0].toUpperCase() + word.slice(1);
            console.log(newWord);
            let index = pokemon.all().indexOf(newWord);
                if( index !== -1 ){
                    console.log(word,index);
                    getPokemon(word,message);
                }
                else{
                    console.log('What are you typing?');
                }
        });
}

async function getPokemon(pokemonName,message){
    console.log('I am async func');
    let params = {
    icon_emoji:':sad:'
    };
    try{
        const res = await axios(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        console.log(res.data);
        if(message.includes(' height')){
            pokemonHeight(res.data);
        }
        else if(message.includes(' weight')){
            pokemonWeight(res.data);
        }
        else if(message.includes(' type')){
            pokemonType(res.data);
        }
        else if(message.includes( 'speed')){
            pokemonSpeed(res.data);
        }
        else if(message.includes( 'defense')){
            pokemonDefense(res.data);
        }
        else if(message.includes( 'attack')){
            pokemonAttack(res.data);
        }
        else if(message.includes( 'hp')){
            pokemonHp(res.data);
        }
        else if(message.includes( 'moves')){
            pokemonMoves(res.data);
        }
        else if(message.includes( ' ability')){
            pokemonMoves(res.data);
        }
    }
    catch(e){
        bot.postMessageToChannel('general',`Something went wrong with the api`,params);         
    }
   
}

function pokemonHeight(pokemonData){
    let params = {
    icon_emoji:':smiley:'
    };
    console.log(pokemonData.height); 
    bot.postMessageToChannel('general',`The height of ${pokemonData.name} is ${pokemonData.height}`,params); 
}

function pokemonWeight(pokemonData){
    let params = {
    icon_emoji:':smiley:'
    };
    console.log(pokemonData.weight); 
    bot.postMessageToChannel('general',`The weight of ${pokemonData.name} is ${pokemonData.weight}kg`,params); 
}

function pokemonType(pokemonData){
    let params = {
    icon_emoji:':smiley:'
    };
    console.log(pokemonData.types[0].type.name); 
    bot.postMessageToChannel('general',`${pokemonData.name} is of type ${pokemonData.types[0].type.name}`,params); 
}

function pokemonSpeed(pokemonData){
    let params = {
        icon_emoji:':smiley:'
        };
        bot.postMessageToChannel('general',`Speed of ${pokemonData.name} is ${pokemonData.stats[0].base_stat}`,params); 
}


function pokemonDefense(pokemonData){
    let params = {
        icon_emoji:':smiley:'
        };
        bot.postMessageToChannel('general',`Defense of ${pokemonData.name} is ${ pokemonData.stats[1].base_stat }`,params); 
}

function pokemonAttack(pokemonData){
    let params = {
        icon_emoji:':smiley:'
        };
        bot.postMessageToChannel('general',`A0ttack of ${pokemonData.name} is ${ pokemonData.stats[2].base_stat }`,params); 
}


function pokemonHp(pokemonData){
    let params = {
        icon_emoji:':smiley:'
        };
        bot.postMessageToChannel('general',`Attack of ${pokemonData.name} is ${ pokemonData.stats[5].base_stat }`,params); 
}

function pokemonMoves(pokemonData){
    let params = {
        icon_emoji:':smiley:'
        };
        let moves =[];
        pokemonData.moves.map((i)=>{
            moves.push(i.move.name);
        });
        console.log(moves);
        bot.postMessageToChannel('general',`Some of the moves used by ${pokemonData.name} are ${moves[0]}, ${moves[1]}, ${moves[2]} and ${moves[3]}`,params); 
}
