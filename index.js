const Discord = require('discord.js');
require('discord-reply');
const client = new Discord.Client();
const { token } = require('./config.json');
const { mongodbSRV } = require('./config.json');
const mongoose = require('mongoose');

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})

mongoose.connect(`${mongodbSRV}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log(`Connected to the database.`)
}).catch((err) => {
    console.log(err);
})

client.login(token)
