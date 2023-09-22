const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES", "DIRECT_MESSAGES"], partials: ["CHANNEL"] });
require('dotenv').config()

client.commands = new Discord.Collection();


const auth = process.env.AUTH_TOKEN;

//set up commands
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))

for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}
client.once('ready', () => {
    console.log('KibBot Online')
})


client.on('messageCreate', async message =>{
    if (message.partial) {
        message.fetch()
            .then(fullMessage => {
                message = fullMessage;
                console.log(fullMessage.content);
            })
            .catch(error => {
                console.log('Something went wrong when fetching the message: ', error);
            });
    }

    console.log(JSON.parse(process.env.THUMBSUP)[0])
    console.log(message.author.id)
    if(message.author.bot) return;
    if(JSON.parse(process.env.THUMBSUP).includes(message.author.id)){
        message.react('👍🏿')
        .then(() => new Promise(resolve => setTimeout(resolve, 50)))
        .then(() => message.react('👍🏾'))
        .then(() => new Promise(resolve => setTimeout(resolve, 50)))
        .then(() => message.react('👍🏽'))
        .then(() => new Promise(resolve => setTimeout(resolve, 50)))
        .then(() => message.react('👍🏼'))
        .then(() => new Promise(resolve => setTimeout(resolve, 50)))
        .then(() => message.react('👍🏻'))
        .then(() => new Promise(resolve => setTimeout(resolve, 50)))
        .then(() => message.react('👍'))
        
    }
    if(JSON.parse(process.env.THUMBSDOWN).includes(message.author.id)){
        message.react('👎🏿')
        .then(() => new Promise(resolve => setTimeout(resolve, 50)))
        .then(() => message.react('👎🏾'))
        .then(() => new Promise(resolve => setTimeout(resolve, 50)))
        .then(() => message.react('👎🏽'))
        .then(() => new Promise(resolve => setTimeout(resolve, 50)))
        .then(() => message.react('👎🏼'))
        .then(() => new Promise(resolve => setTimeout(resolve, 50)))
        .then(() => message.react('👎🏻'))
        .then(() => new Promise(resolve => setTimeout(resolve, 50)))
        .then(() => message.react('👎'))
        
    }
});

client.login(auth)
