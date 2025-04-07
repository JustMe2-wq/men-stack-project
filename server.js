const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 4000;
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');
const authController = require('./controllers/auth.js');
const applicationController = require('./controllers/applications.js');
const employeeController = require('./controllers/employee.js');


mongoose.connect(process.env.MONGO_URI)

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

app.use(session({
    secret: process.env.SECRET_NUMBER,
    resave: false,
    saveUninitialized: true,
}));

app.use(passUserToView);

app.get ('/', (req, res) => {
    if (req.session.user) {
        res.redirect(`/users/${req.session.user._id}/teams`);
    } else if (req.session.user) {
        res.redirect(`/users/${req.session.user._id}/players`);
    } else {
    res.render('home.ejs');
    }
});


app.use('/auth', authController);
app.use('/users/:userId/teams', isSignedIn, applicationController);
app.use('/users/:userId/players', isSignedIn, employeeController);
app.use(isSignedIn);

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

app.use(
    session({
    secret: process.env.SECRET_NUMBER,
    resave: false,
    saveUninitialized: true,
}));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});