//Betolti a profilokat a db-bol, kilistazza a kepeket, leirasokat es oradijakat

module.exports = function (objectrepository) {
    const userModel = objectrepository.userModel;
    return function (req, res, next) {
        userModel.find({ role: 'teacher' }, (err, users) => {
            if (err) {
                return next(err);
            }
            res.locals.users = users;
            return next();
        });
    };
};