// Register

module.exports = function (objectrepository) {
    const userModel = objectrepository.userModel;

    return async function (req, res, next) {
        if (req.body.password !== req.body.password2) {
            req.session.sessionFlash = {
                type: 'danger',
                message: 'Passwords do not match.',
            };
            return next();
        }

        await userModel.findOne({ email: req.body.email }, (err, user) => {
            if (err) {
                req.session.sessionFlash = {
                    type: 'danger',
                    message: 'DB error.',
                };
                
                return next(err);
            }

            if (user) {
                req.session.sessionFlash = {
                    type: 'danger',
                    message: 'E-mail is taken or invalid.',
                };
                return next();
            }
        });

        if (req.body.role === 'student' || req.body.role === 'teacher') {
            userModel.create({ name: req.body.name, email: req.body.email, role: req.body.role, password: req.body.password }, (err) => {
                if (err) {
                    req.session.sessionFlash = {
                        type: 'danger',
                        message: 'DB error.',
                    };
                    
                    return next(err);
                }

                req.session.sessionFlash = {
                    type: 'success',
                    message: 'Successful registration. Now you can log in.',
                };

                return next();
            });
        }
    };
};