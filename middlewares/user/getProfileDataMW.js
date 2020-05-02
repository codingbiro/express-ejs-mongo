//Betolti az adott profil adatait a db-bol, kilistazza az adatait

module.exports = function (objectrepository) {
    const userModel = objectrepository.userModel;

    return function(req, res, next) {
        userModel.findOne({email: req.session.userMail}, (err, user) => {
            if (err) {
                return next(err);
            }
            res.locals.isLoggedIn = (typeof req.session.isLoggedIn === 'undefined') ? false : req.session.isLoggedIn;
            res.locals.user = user;
            return next();
        });
    };
};