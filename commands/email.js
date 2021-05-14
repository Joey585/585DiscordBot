const axios = require('axios');
const { ipfraudAPI } = require('../config.json');
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'email',
    description: 'Gives info about any email',
    aliases: ['emaillookup', 'smtp'],
    permissions: [],
    cooldown: 7,
    execute(client, message, args) {
        if (!args[0]) {
            return message.channel.send('You need to specify what email to use!')
        }

            message.channel.startTyping();
            axios.get(`https://ipqualityscore.com/api/json/email/${ipfraudAPI}/${args[0]}`)
                .then((res) => {
                    const emailEmbed = new MessageEmbed()
                        .setTitle('Email Results')
                        .setDescription('These results aren\'t 100% accurate!')
                        .setThumbnail('https://store-images.s-microsoft.com/image/apps.4725.14294378363439842.5d3bbc47-2b55-4ca4-8cdc-5708b4da8904.71d2f53c-05e2-4406-aac6-30cfb0de432b?mode=scale&q=90&h=200&w=200&background=%230078D7')
                        .addField('Disposable Address?', res.data.disposable)
                        .addField('Suspicious?', res.data.suspect)
                        .addField('Leaked online?', res.data.leaked)
                        .addField('First name?', res.data.first_name)
                        .setFooter('Coded by Joey585#0252')
                    message.lineReplyNoMention(emailEmbed).then(
                       message.channel.stopTyping()
                    )
                })
    }
}