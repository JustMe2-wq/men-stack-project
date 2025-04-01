const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 4000;
const Team = require('./models/teams.js');
const Player = require('./models/workers.js');
const methodOverride = require('method-override');
const morgan = require('morgan');


mongoose.connect(process.env.MONGO_URI)

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));


app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.get('/teams', async (req, res) => {
    const allTeams = await Team.find()
    res.render('teams/index.ejs', { 
        allTeams: allTeams })
})

app.get('/teams/new', (req, res) => {
    res.render('teams/new.ejs')
})

app.delete('/teams/:teamId', async (req, res) => {
    await Team.findByIdAndDelete(req.params.teamId)
    res.redirect('/teams')
})

app.put('/teams/:teamId', async (req, res) => {
    if (req.body.seasonIsReady === 'on') {
        req.body.seasonIsReady = true
    }
    else {
        req.body.seasonIsReady = false
    }

    await Team.findByIdAndUpdate(req.params.teamId, req.body)
    res.redirect(`/teams/${req.params.teamId}`)
})

app.post('/teams', async (req, res) => {
    if (req.body.seasonIsReady === 'on') {
        req.body.seasonIsReady = true
    }
    else {
        req.body.seasonIsReady = false
    }

    await Team.create(req.body)
    res.redirect('/teams')
})

app.get('/teams/:teamId', async (req, res) => {
    const foundTeam = await Team.findById(req.params.teamId)
    res.render('teams/show.ejs', {
        foundTeam: foundTeam
    })
})

app.get('/teams/:teamId/edit', async (req, res) => {
    const foundTeam = await Team.findById(req.params.teamId)
    res.render('teams/edit.ejs', {
        foundTeam: foundTeam
    })
})


app.get('/players', async (req, res) => {
    res.render('players.ejs')
})


app.get('/players', async (req, res) => {
    const allPlayers = await Player.find()
    res.render('players/index.ejs', { 
        allPlayers: allPlayers })
})


app.get('/players/new', (req, res) => {
    res.render('players/new.ejs')
})


app.delete('/players/:playerId', async (req, res) => {
    await Player.findByIdAndDelete(req.params.playerId)
    res.redirect('/players')
})


app.put('/players/:playerId', async (req, res) => {
    if (req.body.isListedHealthy === 'on') {
        req.body.isListedHealthy = true
    }
    else {
        req.body.isListedHealthy = false
    }

    await Player.findByIdAndUpdate(req.params.playerId, req.body)
    res.redirect(`/players/${req.params.playerId}`)
})

app.post('/players', async (req, res) => {
    if (req.body.isListedHealthy === 'on') {
        req.body.isListedHealthy = true
    }
    else {
        req.body.isListedHealthy = false
    }

    await Player.create(req.body)
    res.redirect('/players')
})

app.get('/players/:playerId/edit', async (req, res) => {
    const foundPlayer = await Player.findById(req.params.playerId)
    res.render('players/edit.ejs', {
        foundPlayer: foundPlayer
    })
})

app.get('/players/:playerId', async (req, res) => {
    const foundPlayer = await Player.findById(req.params.playerId)
    res.render('players/show.ejs', {
        foundPlayer: foundPlayer
    })
})


app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})