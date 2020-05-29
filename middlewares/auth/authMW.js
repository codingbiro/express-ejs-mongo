//Authentikalja a felhasznalot

module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (typeof req.session.isLoggedIn === 'undefined' || req.session.isLoggedIn !== true) {
            req.session.sessionFlash = {
                type: 'danger',
                message: 'Log in to view content.',
            };

            return res.redirect('/login');
        }
        console.log('ASD)');
        next();
    };
};