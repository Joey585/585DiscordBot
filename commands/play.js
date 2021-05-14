const ytdl = require('ytdl-core')
const ytSearch = require('yt-search')

module.exports = {
    name: 'play',
    aliases: ['p', 'start', 'music'],
    description: 'Plays music with URL or keywords.',
    permissions: [],
    cooldown: 5,
    async execute(client, message, args, Discord){
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) return message.channel.send('ERROR: You need to be in a voice channel.');
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('ERROR: I can\'t connect to your voice channel');
        if (!permissions.has('SPEAK')) return message.channel.send('ERROR: I cannot speak in your voice channel.');
        if (!args.length) return message.channel.send('ERROR: Please tell me what to play.')

        const validURL = (str) => {
            var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?++&%!\-\/]))?/;
            if (!regex.test(str)){
                return false;
            } else {
                return true;
            }
        }

        if (validURL(args[0])){

            const connection = await voiceChannel.join();
            const stream = ytdl(args[0], {filter: 'audioonly'});

            connection.play(stream, {seek: 0, volume: 1})
            .on('finish', () => {
                voiceChannel.leave();
                message.channel.send('Done playing.');
            });

            await message.channel.send(`Now playing:\n${args[0]}`)

            return
        }

        const connection = await voiceChannel.join();

        const videoFinder = async (query) => {
            const videoResult = await ytSearch(query);

            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;

        }

        const video = await videoFinder(args.join(' '));

        if (video) {
            const stream = ytdl(video.url, {filter: 'audioonly'});
            connection.play(stream, {seek: 0, volume: 1})
            .on('finish', () => {
                voiceChannel.leave();
                message.channel.send('Done playing.')
            });

            await message.channel.send(`Now Playing: \n**${video.title}**`)
        } else {
            message.channel.send('ERROR: No video found.')
        }
    }

}