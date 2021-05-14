const serverModel = require('../models/serverSchema');

module.exports = {
    name: 'premium',
    description: 'Checks if your guild has premium',
    aliases: ['vip', 'paid', 'extra'],
    permissions: [],
    cooldown: 3,
    async execute(client, message, args) {
        const serverData = await serverModel.findOne({ serverID: message.guild.id });

        if (serverData.premium === true) {
            return message.lineReplyNoMention('**Thanks for supporting!**\nYour guild has premium!');
        } else {
           return message.lineReplyNoMention('Your guild does not have premium\nTo buy: go to https://joey585.com/premium');
        }
    }
}