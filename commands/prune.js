module.exports = {
    name: 'prune',
    description: 'Mass deletes messages.',
    aliases: ['clear', 'purge', 'delete'],
    permissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS'],
    cooldown: 15,
    execute (client, message, args) {
        const amount = parseInt(args[0]) + 1
        if (!amount) {
            return message.channel.send('Specify how many messages you want to send.')
        }
        if (amount === NaN) {
            return message.channel.send('This is not a number!')
        }
        if (amount <= 0 || amount > 100) {
            return message.channel.send('Amount needs to be 1-99')
        }
        message.channel.bulkDelete(amount, true).catch(err => {
            message.channel.send('There was an error!')
        })
    }
}