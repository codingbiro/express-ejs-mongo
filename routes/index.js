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
const sendProfileApplicationMW = require('../middlewares/user/sendProfileApplicationMW');
const redirectLoggedInMW = require('../middlewares/auth/redirectLoggedInMW');
const payMW = require('../middlewares/payment/payMW');
const barionCBMW = require('../middlewares/payment/barionCBMW');
const getOrdersMW = require('../middlewares/payment/getOrdersMW');
const getLessonsMW = require('../middlewares/user/getLessonsMW');

const userModel = require('../models/user');
const lessonModel = require('../models/lesson');
const orderModel = require('../models/order');
const resetModel = require('../models/reset');

module.exports = function (app) {
    const objRepo = {
        userModel: userModel,
        lessonModel: lessonModel,
        orderModel: orderModel,
        resetModel: resetModel,
    };

    // Barion cb
    app.post('/',
        barionCBMW(objRepo),
        (req, res) => res.sendStatus(200)
    );

    // Refresh status
    app.get('/refreshOrder',
        barionCBMW(objRepo),
        redirectMW('orders')
    );

    // Index oldal
    app.get('/',
        getProfileDataMW(objRepo),
        getProfilesMW(objRepo),
        renderMW(objRepo, 'index')
    );

    // Index oldal
    app.get('/orders',
        authMW(),
        getProfileDataMW(objRepo),
        getOrdersMW(objRepo),
        renderMW(objRepo, 'orders')
    );

    // Thankyou page
    app.get('/thanks',
        authMW(),
        getProfileDataMW(objRepo),
        renderMW(objRepo, 'thanks')
    );

    // Calendar oldal
    app.get('/calendar',
        getProfileDataMW(objRepo),
        getProfilesMW(objRepo),
        getDatesMW(objRepo),
        renderMW(objRepo, 'calendar')
    );

    // Dashboard felhasznaloi adatok megtekintese
    app.get('/dashboard',
        authMW(),
        getProfileDataMW(objRepo),
        renderMW(objRepo, 'dashboard/index')
    );

    // Dashboard felhasznaloi adatok modositasa
    app.post('/dashboard',
        authMW(objRepo),
        saveProfileDataMW(objRepo),
        redirectMW('dashboard'),
    );

    // Dashboard Calendar
    app.get('/dashboard/calendar',
        authMW(objRepo),
        getProfileDataMW(objRepo),
        getProfileCalendarMW(objRepo),
        renderMW(objRepo, 'dashboard/calendar')
    );

    // Dashboard Calendar
    app.post('/dashboard/calendar',
        authMW(objRepo),
        saveProfileCalendarMW(objRepo),
        redirectMW('dashboard/calendar')
    );

    // Delete a lesson
    app.get('/dashboard/calendar/:id',
        authMW(objRepo),
        deleteProfileCalendarMW(objRepo),
        redirectMW('dashboard/calendar')
    );

    // Dashboard Applications
    app.get('/dashboard/applications',
        authMW(objRepo),
        getProfileDataMW(objRepo),
        getProfileApplicationsMW(objRepo),
        renderMW(objRepo, 'dashboard/applications')
    );

    // Register oldal betoltese, ha authentikalva van akkor fooldal redirect
    app.get('/register',
        redirectLoggedInMW(),
        getProfileDataMW(objRepo),
        renderMW(objRepo, 'register')
    );

    // Register oldalon POST - regisztracio
    app.post('/register',
        registerMW(objRepo),
        redirectMW('register')
    );

    // Login
    app.get('/login',
        getProfileDataMW(objRepo),
        redirectLoggedInMW(),
        renderMW(objRepo, 'login')
    );

    // Login oldalon POST, tehat belep es fooldalra redirect
    app.post('/login',
        checkPassMW(objRepo),
        redirectMW('login')
    );

    app.post('/login/iforgot',
        resetPassMW(objRepo),
        redirectMW('login')
    );

    // Profile oldal, betolti az adott profil adatait
    app.get('/profile/:id',
        getProfileDataMW(objRepo),
        getLessonsMW(objRepo),
        getProfileMW(objRepo),
        renderMW(objRepo, 'profile'),
    );

    // Jelentkezes egy tanarhoz
    app.get('/profile/:id/apply/:lid',
        authMW(),
        getProfileDataMW(objRepo),
        sendProfileApplicationMW(objRepo)
    );

    app.get('/profile/:id/pay/:lid',
        //check if already applied /paid for
        authMW(),
        payMW(objRepo)
    );

    // Logout
    app.get('/logout',
        logoutMW()
    );
}