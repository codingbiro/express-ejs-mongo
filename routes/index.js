const authMW = require('../middlewares/auth/authMW');
const checkPassMW = require('../middlewares/auth/checkPassMW');
//const renderMW = require('../middlewares/renderMW');
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

/*function asd(req, res, next) {
    res.render('a',{b:'a'})
}*/

module.exports = function (app) {
    const objRepo = {};
    
    // Test data
    const users = [{name:'geddy', price: '10$', desc: 'hellllo', img: "http://placekitten.com/200/200", email: "wasd@oo.local", id: 0 }, {name:'neil', price: '9$', desc: 'cheapest in town', img: "http://placekitten.com/400/400", email: "trio@oo.local", id: 1 }, {name:'alex', price: '20$', desc: 'lev tolsztoj', img: "http://placekitten.com/100/100", email: "lollal@oo.local", id: 2 }];

    // Index oldal
    app.get('/', function (req,res) {
        getProfilesMW();
        //renderMW(objRepo, 'index');
        res.render('index', {users: users});
    });

    // Calendar oldal
    app.get('/calendar', function (req,res) {
        getDatesMW();
        //renderMW(objRepo,'calendar');
        res.render('calendar', {});
    });

    // Dashboard felhasznaloi adatok megtekintese
    app.get('/dashboard', function (req,res) {
        authMW();
        getProfileDataMW();
        //renderMW(objRepo,'dashboard/index');
        res.render('dashboard', {user: users[0]});
    });

    // Dashboard felhasznaloi adatok modositasa
    app.post('/dashboard', function (req,res) {
        authMW();
        saveProfileDataMW();
        res.redirect('/dashboard');
    });

    // Dashboard Calendar
    app.get('/dashboard/calendar', function (req,res) {
        authMW();
        getProfileCalendarMW();
        //renderMW(objRepo,'dashboard/calendar');
        res.render('dashboard/calendar', {user: users[0]});
    });

    // Dashboard Calendar
    app.post('/dashboard/calendar', function (req,res) {
        authMW();
        saveProfileCalendarMW();
        res.redirect('/dashboard/calendar');
    });

    // Dashboard Applications
    app.get('/dashboard/applications', function (req,res) {
        authMW();
        getProfileApplicationsMW();
        //renderMW(objRepo,'dashboard/applications');
        res.render('dashboard/applications', {messages: users});
    });

    // Register oldal betoltese, ha authentikalva van akkor fooldal redirect
    app.get('/register', function (req,res) {
        authMW();
        //renderMW(objRepo,'register');
        res.render('register', {});
    });

    // Register oldalon POST, tehat regisztral es fooldalra redirect
    app.post('/register', function (req,res) {
        res.redirect('/');
    });

    // Login, ha be van lepve akkor fooldal redirect
    app.get('/login', function (req,res) {
        authMW();
        //renderMW(objRepo,'login');
        res.render('login', {});
    });

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
    app.get('/profile/:id', function (req,res) {
        getProfileMW();
        //renderMW(objRepo,'profile');
        res.render('profile', {user: users[req.params.id]});
    });

    // Profile oldalon POST, jelentkezni lehet orara
    app.post('/profile/:id', function (req,res) {
        authMW();
        res.redirect('/profile/:id');
    });

    // Logout
    app.get('/logout', function (req,res) {
        logoutMW();
        res.redirect('/');
    });
}