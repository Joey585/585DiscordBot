const serverModel = require('../models/serverSchema');

module.exports = {
    name: 'prefix',
    description: 'Changes the prefix of 585 in your server',
    aliases: ['pref', 'changePrefix'],
    permissions: [],
    cooldown: 5,
    async execute (client, message, args) {
        if (!args[0]) {
            return message.channel.send('Specify what prefix you want!')
        }
        const response = await serverModel.findOneAndUpdate({
            serverID: message.guild.id
        },
            {
                    prefix: `${args[0]}`
            })
        return message.lineReplyNoMention('Changing my prefix to `' + args[0] + '`');
    }

}