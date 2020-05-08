// ora torlese

module.exports = function (objectrepository) {
    const lessonModel = objectrepository.lessonModel;

    return async function (req, res, next) {
        let theid = 0;
        if (typeof req.params.id !== undefined) theid = req.params.id;
        const userId = req.session.userId;
        let theLesson;
        await lessonModel.findOne({ _id: theid }, (err, alesson) => {
            if (err) {
                console.log(err);
            }
            theLesson = alesson;
        });

        let theUser;
        if (theLesson) theUser = String(theLesson._user);
        else next();
        if (theUser !== userId) next();
        else {
            lessonModel.find({
                _id: theid
            }).deleteOne(function (err) {
                if (err) {
                    next(err);
                }
                res.locals.deleted = true;
                next();
            });
        }
    };
};