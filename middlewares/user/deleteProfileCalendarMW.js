module.exports = function (objectrepository) {
    const lessonModel = objectrepository.lessonModel;

    return function(req, res, next) {
        let theid = 0;
        if(typeof req.params.id !== undefined) theid = req.params.id;
        lessonModel.find({
            _id: theid
        }).remove(function (err) {
            if (err) {
                return next(err);
            }
            res.locals.deleted = true;
            next();
        });
    };
};