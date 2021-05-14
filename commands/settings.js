const serverModel = require('../models/serverSchema')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'settings',
    description: 'Changes the settings for your guild',
    aliases: ['welcome', 'spam', 'set'],
    permissions: [],
    cooldown: 15,
    async execute(client, message, args) {
        if (!args[0]) {
            const serverData = await serverModel.findOne({serverID: message.guild.id});

            const settingEmbed = new MessageEmbed()
                .setTitle('Settings for your server')
                .addField('Welcome Message', serverData.settings.welcomeMessage)

            await message.lineReplyNoMention(settingEmbed);
        }
    }
};