const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash-messages');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Using EJS templating
app.set('view engine', 'ejs');

// Using Express Session
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true }));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname,'assets/images'));
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '_' + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}
// Multer for file uplodas
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('img'));

// Helmet for security
app.use(helmet());

// Compression for optimizing page size
app.use(compression());

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
// Morgan for logs
app.use(morgan('combined', { stream: accessLogStream }));

// Flash messages
app.use(flash());
app.use(function (req, res, next) {
    // if there's a flash message in the session request, make it available in the response, then delete it
    res.locals.sessionFlash = req.session.sessionFlash;
    delete req.session.sessionFlash;
    next();
});

// Static folder
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Load routing
require('./routes/index')(app);

// Port settings
const PORT = process.env.PORT || 3000;

// Start server
const server = app.listen(PORT, function () {
    console.log(`Hi port ${PORT}`);
});
