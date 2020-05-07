// Betolti a loggedin profil naptarat a db-bol

module.exports = function (objectrepository) {
    const lessonModel = objectrepository.lessonModel;
    return function (req, res, next) {
        lessonModel.find({ _user: req.session.userId }, null, { sort: 'start' }, (err, lessons) => {
            if (err) {
                return next(err);
            }
            res.locals.lessons = lessons;
            return next();
        });
    };
};