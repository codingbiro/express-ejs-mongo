//Elmenti az adott profil uj naptaresemenyet a db-be

module.exports = function (objectrepository) {
    const lessonModel = objectrepository.lessonModel;
    const date = new Date;

    return function (req, res, next) {
        const thedate = new Date(date.getFullYear(),req.body.month,req.body.day,req.body.hour,req.body.minute);
        
        if(req.body.month <= date.getMonth()) {
            if(req.body.month == date.getMonth()) {
                if(req.body.day <= date.getDate()) {
                    res.locals.dateExpired = true;
                    return next();
                }
            }
            else {
                res.locals.dateExpired = true;
                return next();
            }
        }

        lessonModel.create({start: thedate, duration: req.body.duration, subject: req.body.subject, _user: req.session.userId}, (err) => {
            if (err) {
                return next(err);
            }
            res.locals.lessonAdded = true;
            return next();
        }); 
    };
};