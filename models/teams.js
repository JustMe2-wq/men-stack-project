const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
    name: String,
    
    city: String,

    mascot: String,

    color: String,

    yearFounded: Number,

    seasonIsReady: Boolean,
})

const Team = mongoose.model('Team', teamSchema)

module.exports = Team