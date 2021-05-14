const serverModel = require('../../models/serverSchema')

module.exports = async (client, message, Discord, guild) => {
   let server = await serverModel.create({
        serverID: client.guild.id,
        prefix: '%',
        settings: {
            welcomeMessage: true,
            antiLink: true,
            antiSwear: true,
            antiSpam: true,
        },
       premium: false
    });
   server.save();
}