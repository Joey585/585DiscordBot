const mongoose = require('mongoose');

const serverSchema = new mongoose.Schema({
    serverID: { type: String, require: true, unique: true},
    prefix: { type: String, require: true, default: '%'},
    settings: {
        welcomeMessage: { type: Boolean, require: true},
        antiLink: { type: Boolean, require: true},
        antiSwear: { type: Boolean, require: true},
        antiSpam: { type: Boolean, require: true}
    },
    premium: { type: Boolean, require: true},
    deletedMessage: { type: String},
    deletedAuthor: { type: String }
})

const serverModel = mongoose.model('serverModels', serverSchema);

module.exports = serverModel;