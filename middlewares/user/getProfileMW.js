//Betolti az adott profilt a db-bol, kilistazza az adatait

module.exports = function (objectrepository) {
    const userModel = objectrepository.userModel;

    return function (req, res, next) {
        let theid = 0;
        if (req.params.id !== undefined) theid = req.params.id;
        userModel.findOne({ _id: theid }, (err, user) => {
            if (err) {
                req.session.sessionFlash = {
                    type: 'danger',
                    message: 'DB error.',
                };

                return next(err);
            }
            res.locals.user = user;

            return next();
        });
    };
};