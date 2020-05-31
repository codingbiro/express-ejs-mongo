const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

module.exports = function (objectrepository) {
    const userModel = objectrepository.userModel;
    const resetModel = objectrepository.resetModel;

    return async function (req, res, next) {
        const pass1 = req.body.pass1 ? req.body.pass1 : null;
        const pass2 = req.body.pass2 ? req.body.pass2 : null;
        let pass = null;
        const token = String(req.params.token);

        if (pass1 && pass2) {
            if (pass1 === pass2) {
                pass = String(pass1);
            }
            else {
                req.session.sessionFlash = {
                    type: 'danger',
                    message: 'Passwords do not match.',
                };

                return next();
            }
        }
        else {
            if (pass1) {
                req.session.sessionFlash = {
                    type: 'danger',
                    message: 'Passwords do not match.',
                };
            }
            if (pass2) {
                req.session.sessionFlash = {
                    type: 'danger',
                    message: 'Passwords do not match.',
                };
            }
        }

        let theReset = null;
        await resetModel.findOne({ _id: token }, (err, reset) => {
            if (err) {
                req.session.sessionFlash = {
                    type: 'danger',
                    message: 'DB error.',
                };

                return next(err);
            }
            theReset = reset;
        });

        if (theReset != null) {
            if (theReset.valid) {
                if (pass != null) {
                    await userModel.updateOne({ _id: theReset._user },
                        {
                            $set: {
                                password: pass,
                            },
                        },
                        (err) => {
                            if (err) {
                                req.session.sessionFlash = {
                                    type: 'danger',
                                    message: 'DB error.',
                                };

                                return next(err);
                            }
                        });

                    await resetModel.updateOne({ hash: token },
                        {
                            $set: {
                                valid: false,
                            },
                        },
                        (err) => {
                            if (err) {
                                req.session.sessionFlash = {
                                    type: 'danger',
                                    message: 'DB error.',
                                };

                                return next(err);
                            }
                        });

                    req.session.sessionFlash = {
                        type: 'success',
                        message: 'New password has been set successfully.',
                    };

                    return next();
                }
                else {
                    req.session.sessionFlash = {
                        type: 'danger',
                        message: 'Invalid password. Try again with the given link.',
                    };
        
                    return next();
                }
            }
            else {
                req.session.sessionFlash = {
                    type: 'danger',
                    message: 'Invalid token.',
                };
    
                return next();
            }
        }
        else {
            req.session.sessionFlash = {
                type: 'danger',
                message: 'Invalid token.',
            };

            return next();
        }
    }
};