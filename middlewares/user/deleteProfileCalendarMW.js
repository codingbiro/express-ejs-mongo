// ora torlese

module.exports = function (objectrepository) {
    const lessonModel = objectrepository.lessonModel;

    return async function (req, res, next) {
        let theid = 0;
        if (req.params.id !== undefined) theid = req.params.id;
        const userId = req.session.userId;
        let theLesson;
        await lessonModel.findOne({ _id: theid }, (err, alesson) => {
            if (err) {
                req.session.sessionFlash = {
                    type: 'danger',
                    message: 'DB error.',
                };

                return next(err);
            }
            theLesson = alesson;
        });

        let theUser;

        if (theLesson) theUser = String(theLesson._user);
        else {
            req.session.sessionFlash = {
                type: 'danger',
                message: 'No matching lesson have been found.',
            };

            return next();
        }

        if (theUser !== userId) {
            req.session.sessionFlash = {
                type: 'danger',
                message: 'You do not have permission to delete this lesson.',
            };

            return next();
        }
        else {
            lessonModel.find({
                _id: theid
            }).deleteOne(function (err) {
                if (err) {
                    req.session.sessionFlash = {
                        type: 'danger',
                        message: 'DB error.',
                    };

                    return next(err);
                }

                req.session.sessionFlash = {
                    type: 'warning',
                    message: 'The selected lesson has been deleted.',
                };

                return next();
            });
        }
    };
};