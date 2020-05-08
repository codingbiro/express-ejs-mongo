//Elmenti az adott profil uj naptaresemenyet a db-be
const utils = require('../../misc/utils');

module.exports = function (objectrepository) {
    const lessonModel = objectrepository.lessonModel;
    const date = new Date;

    return function (req, res, next) {
        if (req.session.userRole === "student") res.redirect("/dashboard");

        const thedate = new Date(date.getFullYear(), req.body.month, req.body.day, req.body.hour, req.body.minute);

        if (utils.isExpired(req.body.month, req.body.day)) {
            req.session.sessionFlash = {
                type: 'danger',
                message: "Date has been expired. Try adding an upcoming lesson's date!",
            };

            return next();
        }

        lessonModel.create({ start: thedate, duration: req.body.duration, subject: req.body.subject, _user: req.session.userId }, (err) => {
            if (err) {
                req.session.sessionFlash = {
                    type: 'danger',
                    message: 'DB error.',
                };

                return next(err);
            }
            req.session.sessionFlash = {
                type: 'success',
                message: "New lesson has been added!",
            };

            return next();
        });
    };
};