//Betolti az elerheto orak datumait a db-bol, kilistazza az adatait
const utils = require('../misc/utils');

module.exports = function (objectrepository) {
    const lessonModel = objectrepository.lessonModel;
    return function(req, res, next) {
        lessonModel.find({}, (err, lessons) => {
            if (err) {
                return next(err);
            }
            res.locals.lessons = lessons;
            res.locals.utils = utils;
            return next();
        });
    };
};