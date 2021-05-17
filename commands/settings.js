const serverModel = require('../models/serverSchema')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'settings',
    description: 'Changes the settings for your guild',
    aliases: ['welcome', 'spam', 'set'],
    permissions: [],
    cooldown: 15,
    async execute(client, message, args) {
        let welcomeMessage;
        if (!args[0]) {
            const serverData = await serverModel.findOne({serverID: message.guild.id});

            if (serverData.settings.welcomeMessage === true) {
                welcomeMessage = '<a:YES585:843902695710785566>'
            } else {
                welcomeMessage = '<a:NO585:843902657323466752>'
            }

            const settingEmbed = new MessageEmbed()
                .setTitle('Settings for your server')
                .addField('Welcome Message', welcomeMessage)

            await message.lineReplyNoMention(settingEmbed);
        }
        switch (args[0]) {
            case 'welcome':
                const serverData = await serverModel.findOne({serverID: message.guild.id});

                if (serverData.settings.welcomeMessage === false) {
                    const serverChange = serverModel.findOneAndUpdate({
                        guildID: message.guild.id
                    }, {
                        $set: {
                            welcome: true
                        }
                    }).then(() => {
                        return message.lineReplyNoMention('Toggled your welcome setting!')
                    });

                } else {
                    const serverChange = serverModel.findOneAndUpdate({
                        guildID: message.guild.id
                    }, {
                        $set: {
                            welcome: false
                        }
                    })
                }
                break;
        }
    }


};