const express = require('express');
const router = express.Router();

const User = require('../models/users.js');

router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        console.log(currentUser.teams)
        res.render('teams/index.ejs',
            {
                teams: currentUser.teams,
            });
    } catch (error) {
        console.log(error);
        res.render('/')
    }
});

router.get('/new', (req, res) => {
    res.render('teams/new.ejs');
});

router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);

        currentUser.teams.push(req.body);

        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/teams`);
    } catch (error) {
        console.log(error);
        res.render('/')
    }
});

router.get('/:teamId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const team = currentUser.teams.id(req.params.teamId);
        res.render('teams/show.ejs', {
            team: team,
        });
    } catch (error) {
        console.log(error);
        res.render('/')
    }
});

router.delete('/:teamId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.teams.id(req.params.teamId).deleteOne();
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/teams`);
    } catch (error) {
        console.log(error);
        res.render('/')
    }
});

router.get('/:teamId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const team = currentUser.teams.id(req.params.teamId);
        res.render('teams/edit.ejs', {
            team: team,
        });
    } catch (error) {
        console.log(error);
        res.render('/')
    }
});

router.put('/:teamId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const team = currentUser.teams.id(req.params.teamId);
        team.set(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/teams/${req.params.teamId}`);
    } catch (error) {
        console.log(error);
        res.render('/')
    }
});


module.exports = router;