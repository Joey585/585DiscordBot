module.exports = {
    name: 'leave',
    aliases: ['stop', 's', 'l'],
    description: 'Stops playing music on the voice channel.',
    permissions: [],
    cooldown: 5,
    async execute(client, message, args) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) return message.channel.send('ERROR: You are not in a voice channel.');
        await voiceChannel.leave();
        await message.channel.send('Leaving channel...\nGoodbye!');

    }
}