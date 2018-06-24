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
    let params = {
        icon_emoji:':angry:'
        };
    let msg = message.split(' '); 
    let exist = false;
        msg.map((word)=>{
            console.log(word);
            let newWord = word[0].toUpperCase() + word.slice(1);
            console.log(newWord);
            let index = pokemon.all().indexOf(newWord);
                if( index !== -1 ){
                    console.log(word,index);
                    getPokemon(word,message);
                    exist = true;
                }
                else{
                    console.log('What are you typing?');
                }
        });
        if(!exist){
            bot.postMessageToChannel('general',`I answer only about the pokemon stuff.`,params);                     
        }
}

async function getPokemon(pokemonName,message){
    console.log('I am async func');
    let params = {
    icon_emoji:':sad:'
    };
    try{
        const res = await axios(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        console.log(res.data);
        if(message.includes(' height') || message.includes('height')){
            pokemonHeight(res.data);
        }
        else if(message.includes(' weight') || message.includes('weight')){
            pokemonWeight(res.data);
        }
        else if(message.includes(' type') || message.includes('type') ){
            pokemonType(res.data);
        }
        else if(message.includes(' speed') || message.includes('speed')){
            pokemonSpeed(res.data);
        }
        else if(message.includes(' defense') || message.includes('defense')){
            pokemonDefense(res.data);
        }
        else if(message.includes(' attack') || message.includes('attack')){
            pokemonAttack(res.data);
        }
        else if(message.includes(' hp')|| message.includes('hp')){
            pokemonHp(res.data);
        }
        else if(message.includes(' moves') || message.includes('moves')){
            pokemonMoves(res.data);
        }
        else if(message.includes(' ability') || message.includes('ability')){
            pokemonAbility(res.data);
        }
        else if(message.includes(' experience') || message.includes('experience')){
            pokemonExperience(res.data);
        }
        else if(message.includes(' image') || message.includes('picture') || message.includes('image') || message.includes(' picture')){
            pokemonImage(res.data);
        }
    }
    catch(e){
        bot.postMessageToChannel('general',`Please mention the skill you want to know about`,params);         
    }
   
}

function pokemonHeight(pokemonData){
    let params = {
    icon_emoji:':smiley:'
    };
    console.log(pokemonData.height); 
    bot.postMessageToChannel('general',`The height of ${pokemonData.name} is ${pokemonData.height}`,params); 
}


function pokemonExperience(pokemonData){
    let params = {
    icon_emoji:':smiley:'
    };
    console.log(pokemonData.height); 
    bot.postMessageToChannel('general',`The amount of experience of ${pokemonData.name} is ${pokemonData.base_experience}`,params); 
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

function pokemonAbility(pokemonData){
    let params = {
        icon_emoji:':smiley:'
        };
        let ability =[];
        pokemonData.abilities.map((i)=>{
            ability.push(i.ability.name);
        });
        console.log(moves);
        bot.postMessageToChannel('general',`Some of the ability used by ${pokemonData.name} are ${ability[0]} and ${ability[1]}`,params); 
}

function pokemonImage(pokemonData){
    let params = {
        icon_emoji:':smiley:'
        };
        bot.postMessageToChannel('general',{
            attachments: [{
                "image_url": pokemonData.sprites.front_default
            }]
        },params); 
}