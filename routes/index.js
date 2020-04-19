const authMW = require('../middlewares/auth/authMW');
const checkPassMW = require('../middlewares/auth/checkPassMW');
const renderMW = require('../middlewares/renderMW');
const getProfilesMW = require('../middlewares/user/getProfilesMW');
const getProfileMW = require('../middlewares/user/getProfileMW');
const saveProfileDataMW = require('../middlewares/user/saveProfileDataMW');
const getProfileDataMW = require('../middlewares/user/getProfileDataMW');
const getProfileCalendarMW = require('../middlewares/user/getProfileCalendarMW');
const getDatesMW = require('../middlewares/getDatesMW');
const saveProfileCalendarMW = require('../middlewares/user/saveProfileCalendarMW');
const getProfileApplicationsMW = require('../middlewares/user/getProfileApplicationsMW');
const resetPassMW = require('../middlewares/auth/resetPassMW');
const logoutMW = require('../middlewares/auth/logoutMW');
const redirectMW = require('../middlewares/redirectMW');
const registerMW = require('../middlewares/auth/registerMW');
const deleteProfileCalendarMW = require('../middlewares/user/deleteProfileCalendarMW');

const userModel = require('../models/user');
const lessonModel = require('../models/lesson');

module.exports = function (app) {
    const objRepo = {
        userModel: userModel,
        lessonModel: lessonModel,
    };

    // Index oldal
    app.get('/',
        getProfilesMW(objRepo),
        renderMW(objRepo, 'index')
    );

    // Calendar oldal
    app.get('/calendar', 
        getDatesMW(),
        renderMW(objRepo,'calendar')
    );

    // Dashboard felhasznaloi adatok megtekintese
    app.get('/dashboard',
        authMW(),
        getProfileDataMW(objRepo),
        renderMW(objRepo,'dashboard/index')
    );

    // Dashboard felhasznaloi adatok modositasa
    app.post('/dashboard', function (req,res) {
        authMW(objRepo);
        saveProfileDataMW(objRepo);
        res.redirect('/dashboard');
    });

    // Dashboard Calendar
    app.get('/dashboard/calendar',
        authMW(objRepo),
        getProfileCalendarMW(objRepo),
        renderMW(objRepo,'dashboard/calendar')
    );

    // Dashboard Calendar
    app.post('/dashboard/calendar',
        authMW(objRepo),
        saveProfileCalendarMW(objRepo),
        getProfileCalendarMW(objRepo),
        renderMW(objRepo,'dashboard/calendar')
    );

    app.get('/dashboard/calendar/:id',
        authMW(objRepo),
        deleteProfileCalendarMW(objRepo),
        getProfileCalendarMW(objRepo),
        renderMW(objRepo,'dashboard/calendar')
    );

    // Dashboard Applications
    app.get('/dashboard/applications',
        authMW(objRepo),
        getProfileApplicationsMW(objRepo),
        renderMW(objRepo,'dashboard/applications')
    );

    // Register oldal betoltese, ha authentikalva van akkor fooldal redirect
    app.get('/register',
        authMW(objRepo),
        renderMW(objRepo,'register')
    );

    // Register oldalon POST, tehat regisztral es fooldalra redirect
    app.post('/register',
        registerMW(objRepo),
        renderMW(objRepo,'register')
    );

    // Login, ha be van lepve akkor fooldal redirect
    app.get('/login',
        authMW(),
        renderMW(objRepo,'login')
    );

    // Login oldalon POST, tehat belep es fooldalra redirect
    app.post('/login', function (req,res) {
        checkPassMW();
        res.redirect('/');
    });

    // Login oldalrol elerheto iforgot POST, tehat elkuldi a jelszo resetet emailre es fooldal redirect
    app.post('/login/iforgot', function (req,res) {
        resetPassMW();
        res.redirect('/');
    });

    // Profile oldal, betolti az adott profil adatait
    app.get('/profile/:id',
        getProfileMW(objRepo),
        renderMW(objRepo,'profile'),
    );

    // Profile oldalon POST, jelentkezni lehet orara
    app.post('/profile/:id', function (req,res) {
        authMW();
        res.redirect('/profile/:id');
    });

    // Logout
    app.get('/logout',
        logoutMW(),
        redirectMW(''),
    );
}