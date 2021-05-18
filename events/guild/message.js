const profileModel = require('../../models/profileSchema');
const serverModel = require('../../models/serverSchema');
const { prefix } = require('../../config.json');
const cooldowns = new Map();
const axios = require('axios');
const urlencode = require('urlencode')


module.exports = async (Discord, client, message) => {
    client.prefix = async function (message) {
        let custom;

        const serverConfig = await serverModel.findOne({
            serverID: message.guild.id
        })
        if (!serverConfig) {
            custom = serverConfig.prefix;
        } else {
            custom = prefix;
        }
        return custom;
    }

    const p = await client.prefix(message)

    const args = message.content.slice(p.length).split(/ +/igm);
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    if (message.author.bot) return;

    if (command) {
        if (message.author.bot || !message.content.startsWith(p)) return;
    }

    let profileData;
    try{
        profileData = await profileModel.findOne({ userID: message.author.id });
        if (!profileData) {
            let profile = await profileModel.create({
                userID: message.author.id,
                serverID: message.guild.id,
                coins: 1,
                bank: 0,
                inventory: {
                    'joey585Plushy': false,
                    'crystalMeth': false,
                    'ratPoison': false,
                    'otterPlushy': false
                }
            });
            profile.save();
        }
    }catch(err){
        console.log(err)
    }
    let serverData;
    try {
        serverData = await serverModel.findOne( { serverID: message.guild.id} );
        if (!serverData) {
            let server = await serverModel.create({
                serverID: message.guild.id,
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
    } catch (err) {
        console.log(err)
    }

    const validPermissions = [
        "CREATE_INSTANT_INVITE",
        "KICK_MEMBERS",
        "BAN_MEMBERS",
        "ADMINISTRATOR",
        "MANAGE_CHANNELS",
        "MANAGE_GUILD",
        "ADD_REACTIONS",
        "VIEW_AUDIT_LOG",
        "PRIORITY_SPEAKER",
        "STREAM",
        "VIEW_CHANNEL",
        "SEND_MESSAGES",
        "SEND_TTS_MESSAGES",
        "MANAGE_MESSAGES",
        "EMBED_LINKS",
        "ATTACH_FILES",
        "READ_MESSAGE_HISTORY",
        "MENTION_EVERYONE",
        "USE_EXTERNAL_EMOJIS",
        "VIEW_GUILD_INSIGHTS",
        "CONNECT",
        "SPEAK",
        "MUTE_MEMBERS",
        "DEAFEN_MEMBERS",
        "MOVE_MEMBERS",
        "USE_VAD",
        "CHANGE_NICKNAME",
        "MANAGE_NICKNAMES",
        "MANAGE_ROLES",
        "MANAGE_WEBHOOKS",
        "MANAGE_EMOJIS",
    ]

    if (command) {

        if (!command.permissions) {
            return console.log(`${command.name} has no permissions!`);
        }


        if (command.permissions.length) {
            let invalidPerms = []
            for (const perm of command.permissions) {
                if (!validPermissions.includes(perm)) {
                    return console.log(`Invalid Permission: ${perm}`);
                }
                if (!message.member.hasPermission(perm)) {
                    invalidPerms.push(perm)
                    break;
                }
            }
            if (invalidPerms.length) {
                return message.channel.send(`${message.author}, you need the permission: \`${invalidPerms}\``);
            }
        }
    }

    /* if (message.content && !command) {
        function isValidURL(string) {
            const res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
            return (res !== null)
        };
        const urlCheck = message.content
        if (isValidURL(urlCheck) === true) {
            const url = urlencode(`${message.content}`)
          // message.channel.send(`Testing the url sent by ${message.author}...`)
            message.channel.startTyping();
            axios.get(`https://ipqualityscore.com/api/json/url//${url}`)
                .then((res) => {
                    if (res.data.malware === true || res.data.phishing === true || res.data.unsafe === true) {
                        message.delete();
                        message.channel.send(`Illegal link sent by ${message.author}!!`)
                        message.channel.stopTyping();
                    } else {
                        return message.channel.stopTyping();
                    }
                }).catch(err => {
                message.channel.stopTyping();
                return message.channel.send(`There was an error checking that url!`)
            })
        } else {
            return;
        }
    } */

    if (command) {

        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
        }

        const currentTime = Date.now();
        const timeStamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown) * 1000;

        if (timeStamps.has(message.author.id)) {
            const experationTime = timeStamps.get(message.author.id) + cooldownAmount;

            if (currentTime < experationTime) {
                const timeLeft = (experationTime - currentTime) / 1000

                return message.reply(`COOLDOWN: You have ${timeLeft.toFixed(1)} more seconds until you can use this command!`)
            }
        }

        timeStamps.set(message.author.id, currentTime);
        setTimeout(() => timeStamps.delete(message.author.id), cooldownAmount);
    }

    if (command) {

        try {
            command.execute(client, message, args, Discord);
        } catch (err) {
            message.channel.send('There was an error! Try doing %help')
            console.log(err)
        }
    }
};