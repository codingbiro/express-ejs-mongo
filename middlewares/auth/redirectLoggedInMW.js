// He belepve, redirect

module.exports = function (objectrepository) {
    return function (req, res, next) {

        if (typeof req.session.isLoggedIn !== 'undefined') {
            if (req.session.isLoggedIn === true)
                return res.redirect('/dashboard');
        }

        next();
    };
};