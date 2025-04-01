const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
    name: String,

    position: String,

    number: Number,

    height: String,

    weight: Number,

    isListedHealthy: Boolean,
})

const Player = mongoose.model('Player', playerSchema)

module.exports = Player