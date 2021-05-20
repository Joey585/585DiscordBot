const serverModel = require('../../models/serverSchema');
const {MessageEmbed} = require('discord.js');
module.exports = async (client, message, newGuild) => {
    const intro = new MessageEmbed()
        .setTitle('Hello!')
        .setAuthor('585 Bot', 'https://cdn.discordapp.com/attachments/620826891145838602/844813399908941875/585.png', 'https://joey585.com')
        .setURL('https://joey585.com')
        .setThumbnail('https://cdn.discordapp.com/attachments/620826891145838602/844813399908941875/585.png')
        .setDescription('Hello, my name is 585 bot and I will be taking care of your server.\n\nThis bot will be (or try to be) the most user-friendly and secure bot.\n\n**Start with `%help` to get started!**')

    const serverData = await serverModel.findOne({serverID: newGuild.id})
    if (!serverData) {
        let server = await serverModel.create({
            serverID: newGuild.id,
            prefix: '%',
            settings: {
                welcomeMessage: true,
                antiLink: true,
                antiSwear: true,
                antiSpam: true,
            },
            premium: false
        });
        await server.save();
    }

    const channel1 = newGuild.channels.cache.find(c => c.name === 'general');
    const channel2 = newGuild.channels.cache.find(c => c.name === 'welcome');

    if (channel1 === undefined) {
        return newGuild.channels.cache.get(channel2.id).send(intro);
    }

    newGuild.channels.cache.get(channel1.id).send(intro);

}