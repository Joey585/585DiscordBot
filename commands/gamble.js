module.exports = {
    name: 'gamble',
    aliases: ['bet', 'earn'],
    description: 'Gamble your money! Good luck.',
    permissions: [],
    cooldown: 100,
    execute(client, message, args) {
        if (!args[0]) {
            return message.channel.send('How much money do you want to gamble?');
        }
        if (isNaN(args[0])) {
            return message.channel.send('You need an amount of money to gamble!');
        }


        const chance = Math.floor(Math.random * args[0])
        const amount = args[0] / 4

        if (chance >= 0 && chance <= amount) {
            return message.lineReplyNoMention('Yeesh, you didn\'t earn anything.\nAlso you lost 100 coins')
        }
    }

}