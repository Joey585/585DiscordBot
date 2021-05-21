const {MessageEmbed} = require("discord.js");
module.exports = {
    name: 'ban',
    description: 'Bans a user from your guild.',
    aliases: [],
    permissions: ['BAN_MEMBERS'],
    cooldown: 30,
    execute(client, message, args) {
        const banMember = message.mentions.members.first();
        let reason = args.slice(1).join(' ')
        if (!banMember) return message.lineReplyNoMention('You need to specify who to ban!');
        if (banMember.id === message.author.id) return message.lineReplyNoMention('You cannot ban yourself!');
        if (banMember.id === client.user.id) return message.lineReplyNoMention('You cannot ban me with my own command!');
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.lineReplyNoMention('I do not have the permissions to execute this ban.');
        if (!reason) {
            reason = 'Not specified'
        }
        banMember.ban({
            reason: reason
        }).then(() => {
            const banEmbed = new MessageEmbed()
                .setTitle(`${banMember.user.tag} was banned!`)
                .setDescription(`Banned by ${message.author}`)
                .setAuthor('585 Bot', client.user.displayAvatarURL(), 'https://joey585.com')
                .setThumbnail(banMember.user.displayAvatarURL())
                .addField('Reason:', reason)
                .setFooter('Time Banned:')
                .setTimestamp()
            return message.lineReplyNoMention(banEmbed);
        }).catch(() => {
            return message.lineReplyNoMention(`There was an error banning ${banMember.user.tag}`);
        })
    }
}