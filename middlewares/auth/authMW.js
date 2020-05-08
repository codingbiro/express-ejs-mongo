//Authentikalja a felhasznalot

module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (typeof req.session.isLoggedIn === 'undefined' || req.session.isLoggedIn !== true) {
            return res.redirect('/login');
        }

        next();
    };
};