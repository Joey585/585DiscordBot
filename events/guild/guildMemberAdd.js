const serverModel = require('../../models/serverSchema');
const { MessageEmbed } = require('discord.js')

module.exports = async(client, discord, member) => {

    let welcomeRole = member.guild.roles.cache.find(r => r.name === "member");
    if (!welcomeRole) {
      let role = await member.guild.roles.create({
          data: {
              name: 'member',
              color: 'BLUE',
          },
          reason: 'Added welcome role',
      })
        await member.guild.members.cache.get(member.id).roles.add(role.id)
    }

    if (welcomeRole) {
        member.guild.members.cache.get(member.id).roles.add(welcomeRole.id)
    }

    const welcomeEmbed = new MessageEmbed()
        .setTitle(`Welcome ${member.user.tag} to ${member.guild.name}!`)
        .setDescription('A new user has joined!')
        .setImage(member.user.displayAvatarURL())

    let serverData = await serverModel.findOne( { serverID: member.guild.id} );
    if (serverData.settings.welcomeMessage === false) return;
    member.guild.channels.cache.find(c => c.name === "welcome").send(welcomeEmbed);
}