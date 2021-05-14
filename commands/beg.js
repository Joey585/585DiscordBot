const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'beg',
    description: 'Gives you money if you run this command.',
    cooldown: 20,
    permissions: [],
    aliases: ['moneyPlease'],
    async execute(client, message, args) {
        const randomNumber = Math.floor(Math.random() * 500) + 1;
        if (randomNumber <= 499) {
            const moneyEarned = Math.floor(Math.random() * 1000) + 1;
            const response = await profileModel.findOneAndUpdate({
                userID: message.author.id,
            },
            {
                $inc: {
                    coins: moneyEarned
                }
            })
            return message.channel.send(`You earned ${moneyEarned} coins`)
        } else {
            const response = await profileModel.findOneAndUpdate({
                userID: message.author.id,
            }, {
                $inc: {
                    coins: 1000000
                }
            })
            return message.channel.send('Congrats!\nYou earned 1,000,000 coins! 1/500 chance happening!')
        }

    },

}