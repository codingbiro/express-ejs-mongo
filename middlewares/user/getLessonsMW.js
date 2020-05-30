// Betolti a loggedin profil naptarat a db-bol
const utils = require('../../misc/utils');

module.exports = function (objectrepository) {
    const lessonModel = objectrepository.lessonModel;
    return function (req, res, next) {
        const theid = String(req.params.id);

        lessonModel.find({ _user: theid }, null, { sort: 'start' }, (err, lessons) => {
            if (err) {
                req.session.sessionFlash = {
                    type: 'danger',
                    message: 'DB error.',
                };

                return next(err);
            }
            res.locals.lessons = lessons;
            res.locals.utils = utils;

            return next();
        });
    };
};