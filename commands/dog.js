const axios = require("axios");
const {MessageEmbed} = require("discord.js");

module.exports = {
    name: 'dog',
    description: 'Generates a random picture of a dog',
    aliases: ['doggy', 'dogpic'],
    permissions: [],
    cooldown: 10,
    execute(client, message) {
        axios.get('https://dog.ceo/api/breeds/image/random')
            .then((res) => {
                const dogEmbed = new MessageEmbed()
                    .setTitle('Dog Image')
                    .setImage(res.data.message)
                    .setFooter('API: https://dog.ceo')
                message.lineReplyNoMention(dogEmbed);
            }).catch((err) => {
            return message.lineReplyNoMention('Error getting doggy picture <a:crie:822496459353358366>');
        });
    }
}