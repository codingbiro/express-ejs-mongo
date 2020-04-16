const authMW = require('../middlewares/auth/authMW');
const checkPassMW = require('../middlewares/auth/checkPassMW');
const renderMW = require('../middlewares/renderMW');
const getProfilesMW = require('../middlewares/getProfilesMW');
const getProfileMW = require('../middlewares/getProfileMW');
const saveProfileDataMW = require('../middlewares/saveProfileDataMW');
const getProfileDataMW = require('../middlewares/getProfileDataMW');
const getProfileCalendarMW = require('../middlewares/getProfileCalendarMW');
const getDatesMW = require('../middlewares/getDatesMW');
const saveProfileCalendarMW = require('../middlewares/saveProfileCalendarMW');
const getProfileApplicationsMW = require('../middlewares/getProfileApplicationsMW');
const resetPassMW = require('../middlewares/auth/resetPassMW');
const logoutMW = require('../middlewares/auth/logoutMW');
const mainRedirectMW = require('../middlewares/mainRedirectMW');

module.exports = function (app) {
    const objRepo = {};

    // Index oldal
    app.get('/',
        getProfilesMW(),
        renderMW(objRepo, 'index'),
        //res.render('index', {users: users});
    );

    // Calendar oldal
    app.get('/calendar', 
        getDatesMW(),
        renderMW(objRepo,'calendar')
    );

    // Dashboard felhasznaloi adatok megtekintese
    app.get('/dashboard',
        authMW(),
        getProfileDataMW(),
        renderMW(objRepo,'dashboard/index')
    );

    // Dashboard felhasznaloi adatok modositasa
    app.post('/dashboard', function (req,res) {
        authMW();
        saveProfileDataMW();
        res.redirect('/dashboard');
    });

    // Dashboard Calendar
    app.get('/dashboard/calendar',
        authMW(),
        getProfileCalendarMW(),
        renderMW(objRepo,'dashboard/calendar')
    );

    // Dashboard Calendar
    app.post('/dashboard/calendar', function (req,res) {
        authMW();
        saveProfileCalendarMW();
        res.redirect('/dashboard/calendar');
    });

    // Dashboard Applications
    app.get('/dashboard/applications',
        authMW(),
        getProfileApplicationsMW(),
        renderMW(objRepo,'dashboard/applications')
    );

    // Register oldal betoltese, ha authentikalva van akkor fooldal redirect
    app.get('/register',
        authMW(),
        renderMW(objRepo,'register')
    );

    // Register oldalon POST, tehat regisztral es fooldalra redirect
    app.post('/register', function (req,res) {
        res.redirect('/');
    });

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
        getProfileMW(),
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
        mainRedirectMW(),
    );
}