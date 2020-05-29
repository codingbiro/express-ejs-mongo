// Betolti a loggedin profil adatait a db-bol

module.exports = function (objectrepository) {
    const userModel = objectrepository.userModel;

    return function (req, res, next) {
        userModel.findOne({ email: req.session.userMail }, (err, user) => {
            if (err) {
                req.session.sessionFlash = {
                    type: 'danger',
                    message: 'DB error.',
                };

                return next(err);
            }
            
            res.locals.isLoggedIn = (typeof req.session.isLoggedIn === 'undefined') ? false : req.session.isLoggedIn;
            res.locals.user = user;

            return next();
        });
    };
};