const epress = require('express');
const router = epress.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users.js');

router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up.ejs');
});

router.get('/sign-in', async (req, res) => {
    res.render('auth/sign-in.ejs');
});

router.get('/sign-out', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

router.post('/sign-up', async (req, res) => {
    try {
        const userInDataBase = await User.findOne({ username: req.body.username });
        if (userInDataBase) {
            return res.send('auth/sign-up.ejs', {
                message: 'Username already exists. choose another one.',
            });
        }
        if (req.body.password !== req.body.confirmPassword) {
            return res.send('auth/sign-up.ejs', {
                message: 'Passwords do not match. try again.',
            });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;

        await User.create(req.body);
        res.redirect('/auth/sign-in');
    } catch (error) {
        console.log(error);
        res.redirect("/")
    }
});

router.post('/sign-in', async (req, res) => {
    try {
        const userInDataBase = await User.findOne({ username: req.body.username });
        if (!userInDataBase) {
            return res.send('auth/sign-in.ejs', {
                message: 'Username does not exist.',
            });
        }
        const validPassword = await bcrypt.compareSync(
            req.body.password,
            userInDataBase.password
        );
        if (!validPassword) {
            return res.send('auth/sign-in.ejs', {
                message: 'Invalid password.',
            });
        }
        req.session.user = {
            _id: userInDataBase._id,
            username: userInDataBase.username,
        };

        console.log(req.session.user);
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.redirect("/")
    }
});

module.exports = router;