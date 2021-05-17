const {MessageEmbed} = require("discord.js");
const {mallenLinks} = require('../images.json');

module.exports = {
    name: "mallen",
    description: "Generates a random mallen picture",
    aliases: ['hankey', 'jonis'],
    permissions: [],
    cooldown: 10,
    execute(client, message, args) {
        const mallenNumber = Math.floor(Math.random() * mallenLinks.length);

        const mallenEmbed = new MessageEmbed()
            .setTitle('Random Mallen Picture')
            .setImage(mallenLinks[mallenNumber])
        return message.lineReplyNoMention(mallenEmbed);
    }

}