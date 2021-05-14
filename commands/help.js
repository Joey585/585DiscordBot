module.exports = {
    name: 'help',
    aliases: ['whatis', '?', 'how'],
    description: 'Help command for new users.',
    permissions: [],
    cooldown: 10,
    execute(client, message, args) {
        const {MessageEmbed} = require('discord.js');
        const helpEmbed1 = new MessageEmbed()
            .setTitle('Help Section')
            .setURL('https://joey585.com/help')
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(client.commands.map(cmd => `**${cmd.name}**: \`${cmd.description.toLowerCase()}\``).join("\n \n"))
        message.lineReplyNoMention('Check Direct Messages!').then(() => {
            if (message.channel.type === 'dm') return;
            return message.author.send(helpEmbed1);
        }).catch(() => {
           return message.lineReplyNoMention('Couldn\'t send help command!\nDid you turn on your direct messages?')
        })
    }
}


