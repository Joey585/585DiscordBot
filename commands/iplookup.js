const axios = require('axios');
const { ipfraudAPI } = require('../config.json');
const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'iplookup',
    description: 'Looks up an IP and gives info on it.',
    aliases: ['ip', 'lookupip'],
    permissions: [],
    cooldown: 7,
    execute (client, message, args) {
        if (!args[0]) {
            return message.channel.send('You need to send an IP to lookup')
        }

        message.channel.startTyping();
        axios.get(`https://ipqualityscore.com/api/json/ip/${ipfraudAPI}/${args[0]}?strictness=0&allow_public_access_points=true&fast=true&lighter_penalties=true&mobile=true`)
            .then((res) => {
                if (res.data.proxy === undefined) {
                    const errorEmbed = new MessageEmbed()
                        .setTitle('❌ IP Invalid ❌')
                   return message.channel.send(errorEmbed)
                }
                const ipEmbed = new MessageEmbed()
                    .setTitle(`Ip Results on ${args[0]}`)
                    .setDescription('These results are not 100% accurate!')
                    .setThumbnail('https://images-na.ssl-images-amazon.com/images/I/51zdsrq20LL.png')
                    .addField('VPN?', res.data.vpn, true)
                    .addField('Tor Browser?', res.data.tor, true)
                    .addField('Proxy?', res.data.proxy, true)
                    .addField('Fraud Score 1 - 100', res.data.fraud_score, true)
                    .addField('Country Code', res.data.country_code, true)
                    .addField('Region', res.data.region, true)
                    .addField('City', res.data.city, true)
                    .addField('ISP', res.data.ISP, true)
                    .addField('Mobile?', res.data.mobile, true)
                message.lineReplyNoMention(ipEmbed).then(
                   message.channel.stopTyping()
                )

            }).catch((err) => {
                const errorEmbed = new MessageEmbed()
                    .setTitle('🛑 Error 🛑')
                    .setDescription('There was an error trying to lookup this IP')
                message.channel.send(errorEmbed)
                return message.channel.stopTyping();
        })
    }
}