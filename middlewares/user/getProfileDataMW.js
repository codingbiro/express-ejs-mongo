//Betolti az adott profil adatait a db-bol, kilistazza az adatait

const theid = "5e9b588385018c3e38ff2c1f"; //Later from auth

module.exports = function (objectrepository) {
    const userModel = objectrepository.userModel;

    return function(req, res, next) {
        userModel.findOne({_id: theid}, (err, user) => {
            if (err) {
                return next(err);
            }
            res.locals.user = user;
            return next();
        });
    };
};