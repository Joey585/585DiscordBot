const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userID: { type: String, require: true, unique: true},
    serverID: { type: String, require: true},
    coins: { type: Number, default: 1},
    bank: {type: Number},
    inventory: {
        joey585Plushy: { type: Boolean },
        crystalMeth: { type: Boolean },
        ratPoison: { type: Boolean },
        otterPlushy: { type: Boolean }
    },
})

const model = mongoose.model('ProfileModels', profileSchema);

module.exports = model;