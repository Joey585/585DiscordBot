const serverModel = require('../models/serverSchema');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'snipe',
    description: 'Shows the last edited message and the last deleted message',
    permissions: [],
    aliases: ['expose', 'logger'],
    cooldown: 10,
   async execute (client, message) {
        const serverData = await serverModel.findOne({serverID: message.guild.id});

        const snipeEmbed = new MessageEmbed()
            .setTitle('Sniped Message <:snipe:842306839592173588>')
            .setDescription(serverData.deletedMessage)
            .setFooter(`Sent from ${serverData.deletedAuthor}`)

        await message.lineReplyNoMention(snipeEmbed);
    }
}