const profileModel = require('../models/profileSchema');
const {MessageEmbed} = require("discord.js");

module.exports = {
    name: 'inventory',
    description: 'Checks what you have in your inventory',
    aliases: ['inv', 'backpack', 'me'],
    permissions: [],
    cooldown: 7,
   async execute (client, message, args, ) {
        const serverData = await profileModel.findOne({ userID: message.author.id });

        const inventoryEmbed = new MessageEmbed()
            .setTitle('Your inventory')
            .setDescription(serverData.inventory)
       return message.lineReplyNoMention(inventoryEmbed);

    }
}