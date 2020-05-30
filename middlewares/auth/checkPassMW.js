//TODO else ag miert fut le HIGH PRIO
const utils = require('../../misc/utils');

module.exports = function (objectrepository) {
    const userModel = objectrepository.userModel;

    return async function (req, res, next) {
        if (typeof req.body.password === 'undefined' || typeof req.body.email === 'undefined') {
            return next();
        }

        let theUser = null;

        await userModel.findOne({ email: req.body.email }, (err, user) => {
            if (err) {
                req.session.sessionFlash = {
                    type: 'danger',
                    message: 'DB error.',
                };

                return next(err);
            }
            theUser = user;
        });

        if (theUser != null) {
            if (req.body.password === theUser.password) {
                req.session.isLoggedIn = true;
                req.session.userMail = theUser.email;
                req.session.userId = theUser._id;
                req.session.userRole = theUser.role;

                return req.session.save(err => {
                    if (err) {
                        req.session.sessionFlash = {
                            type: 'danger',
                            message: 'Error in saving your session.',
                        };

                        return next(err);
                    }
                    res.redirect('/dashboard');
                });
            }
            else {
                req.session.sessionFlash = {
                    type: 'danger',
                    message: 'Wrong credentials.',
                };
            }
        }
        // Ez az ag lefut neha
        else {
            req.session.sessionFlash = {
                type: 'danger',
                message: 'Wrong credentials!',
            };
        }

        return next();
    };
};
