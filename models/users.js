const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
    name: String,
    
    city: String,

    mascot: String,

    color: String,

    yearFounded: Number,
    status: {
        type: String,
        enum: ['active', 'inactive'],
        required: true,
    }
})

const playerSchema = new mongoose.Schema({

    name: String,

    position: String,

    number: Number,

    height: String,

    weight: Number,

    playsFor: String,
    
    status: {
        type: String,
        enum: ['active', 'inactive'],
        required: true,
    }
})

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

    teams: [teamSchema],
    players: [playerSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;