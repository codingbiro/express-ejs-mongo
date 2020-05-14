//Megnezi jo e a jelszo a belepesnel
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
                console.log("db error");
                req.session.sessionFlash = {
                    type: 'danger',
                    message: 'DB error.',
                };

                return next(err);
            }
            theUser = user;
        });

        if (theUser) {
            console.log('theUser goood');
            if (req.body.password === theUser.password) {
                req.session.isLoggedIn = true;
                req.session.userMail = theUser.email;
                req.session.userId = theUser._id;
                req.session.userRole = theUser.role;

                return req.session.save(err => {
                    if (err) {
                        console.log("db error");
                        req.session.sessionFlash = {
                            type: 'danger',
                            message: 'DB error.',
                        };

                        return next(err);
                    }
                    res.redirect('/dashboard');
                });
            }
            else {
                console.log("jelszo nem egyezik");
                req.session.sessionFlash = {
                    type: 'danger',
                    message: 'Wrong credentials.',
                };
            }
        }
        else {
            console.log("theUser wrong");
            req.session.sessionFlash = {
                type: 'danger',
                message: 'Wrong credentials.',
            };
        }

        return next();
    };
};