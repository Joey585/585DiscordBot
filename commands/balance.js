const profileModel = require('../models/profileSchema');

module.exports = {
    name: "balance",
    description: "Checks how much coins you have.",
    aliases: ['bal', 'b'],
    permissions: [],
    cooldown: 5,
    async execute (client, message, args) {
        let profileData;
        profileData = await profileModel.findOne({ userID: message.author.id });
        message.channel.send(`Your Balance: ${profileData.coins}\nBank Balance: ${profileData.bank}`)
    }
}