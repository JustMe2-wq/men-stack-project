const express = require('express');
const router = express.Router();

const User = require('../models/users.js');


router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render('players/index.ejs',
            {
                players: currentUser.players,
            });
    } catch (error) {
        console.log(error);
        res.render('/');
    }
});

router.get('/new', async (req, res) => {
    const currentUser = await User.findById(req.session.user._id);
    res.render('players/new.ejs', {
        teams: currentUser.teams
    });
});

router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);

        currentUser.players.push(req.body);

        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/players`);
    } catch (error) {
        console.log(error);
        res.render('/');
    }
});

router.get('/:playerId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id).populate("teams").setOptions({ strictPopulate: false })
        const player = currentUser.players.id(req.params.playerId)
        const team = currentUser.teams.find(team => team._id.toString() === player.team.toString())
        console.log(player.team)
        res.render('players/show.ejs', {
            player: player,
            team: team
        });
    } catch (error) {
        console.log(error);
        res.render('/');
    }
});

router.delete('/:playerId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.players.id(req.params.playerId).deleteOne();
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/players`);
    } catch (error) {
        console.log(error);
        res.render('/');
    }
});

router.get('/:playerId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id).populate("teams").setOptions({ strictPopulate: false })
        const player = currentUser.players.id(req.params.playerId);
        const team = currentUser.teams.find(team => team._id.toString() === player.team.toString())
        console.log(player.team, "this is the players team")
        await currentUser.save()
        res.render('players/edit.ejs', {
            player: player,
            team: team
        });
    } catch (error) {
        console.log(error);
        res.render('/');
    }
});

router.put('/:playerId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        const player = currentUser.players.id(req.params.playerId);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/players`);
        team.players.push(player._id)
        await team.save()
    } catch (error) {
        console.log(error);
        res.render('/');
    }
});

module.exports = router;