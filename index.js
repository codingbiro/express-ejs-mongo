const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash-messages');

// Using EJS templating
app.set('view engine', 'ejs');

// Using Express Session
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true }));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Flash messages
app.use(flash());
app.use(function (req, res, next) {
    // if there's a flash message in the session request, make it available in the response, then delete it
    res.locals.sessionFlash = req.session.sessionFlash;
    delete req.session.sessionFlash;
    next();
});

// Static folder
app.use(express.static('assets'));

// Load routing
require('./routes/index')(app);

// Port settings
const PORT = 3000;

// Start server
const server = app.listen(PORT, function () {
    console.log(`Hi port ${PORT}`);
});
