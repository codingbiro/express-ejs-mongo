//Betolti az adott profil naptarat a db-bol, kilistazza az adatait

module.exports = function(objectrepository) {
    const lessonModel = objectrepository.lessonModel;
    return function(req, res, next) {
        lessonModel.find({}, null, {sort: 'start'}, (err, lessons) => {
            if (err) {
                return next(err);
            }
            res.locals.lessons = lessons;
            return next();
        });
    };
};