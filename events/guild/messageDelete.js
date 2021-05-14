const serverModel = require('../../models/serverSchema');

module.exports = async (client, messageDelete, member) => {
    const response = await serverModel.findOneAndUpdate({
            serverID: member.guild.id
        },
        {
            deletedMessage: member.content,
            deletedAuthor: member.author.tag
        })
}