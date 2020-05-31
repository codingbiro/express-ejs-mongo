const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

module.exports = function (objectrepository) {
    return asnyc function (req, res, next) {
        const userModel = objectrepository.userModel;
        const resetModel = objectrepository.resetModel;

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

            const secret = process.env.NODE_ENV ? process.env.HASH_SECRET : 'ASDASDasd';
            const hash = crypto.createHmac('sha256', secret)
                .update('I love cupcakes')
                .digest('hex');

            resetModel.create({ hash: hash, _user: theUser._id, valid: true }, (err) => {
                if (err) {
                    req.session.sessionFlash = {
                        type: 'danger',
                        message: 'DB error.',
                    };

                    return next(err);
                }

                const url = `https://math.biro.wtf/resetpassword/${hash}`;

                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'quick.biro@gmail.com',
                        pass: 'Laklik98'
                    }
                });

                const mailOptions = {
                    from: 'hello@math.biro',
                    to: theUser.email,
                    subject: 'Password reset',
                    text: 'Click this magic link to reset your password: ' + url
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });

                req.session.sessionFlash = {
                    type: 'success',
                    message: 'If the given email address exists in our system, an e-mail should be on its way with the further steps.',
                };

                return next();
            });
        }
    };
};