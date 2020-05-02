// Register

module.exports = function (objectrepository) {
    const userModel = objectrepository.userModel;

    return function (req, res, next) {
        if(req.body.password !== req.body.password2) {
            res.locals.passwordsDoNotMatch = true;
            req.session.pwds = 'loop';
            return next();
        }
        if(req.body.role === 'student' || req.body.role === 'teacher') {
            userModel.create({name: req.body.name, email: req.body.email, role: req.body.role, password: req.body.password}, (err) => {
                if (err) {
                    return next(err);
                }
                res.locals.registered = true;
                res.redirect('/login');
            });
        } 
    };
};