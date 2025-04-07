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

router.get('/new', (req, res) => {
    res.render('players/new.ejs');
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
        const currentUser = await User.findById(req.session.user._id);
        const player = currentUser.players.id(req.params.playerId);
        res.render('players/show.ejs', {
            player: player,
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
        const currentUser = await User.findById(req.session.user._id);
        const player = currentUser.players.id(req.params.playerId);
        res.render('players/edit.ejs', {
            player: player,
        });
    } catch (error) {
        console.log(error);
        res.render('/');
    }
});

router.put('/:playerId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const player = currentUser.players.id(req.params.playerId);
        player.set(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/players`);
    } catch (error) {
        console.log(error);
        res.render('/');
    }
});

module.exports = router;