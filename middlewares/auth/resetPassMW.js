const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

module.exports = function (objectrepository) {
    const userModel = objectrepository.userModel;
    const resetModel = objectrepository.resetModel;

    return async function (req, res, next) {
        let theUser = null;

        await userModel.findOne({ email: req.body.resetemail }, (err, user) => {
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

            await resetModel.create({ hash: hash, _user: theUser._id, valid: true }, (err, result) => {
                if (err) {
                    req.session.sessionFlash = {
                        type: 'danger',
                        message: 'DB error.',
                    };

                    return next(err);
                }

                const url = `https://math.biro.wtf/resetpassword/${result._id}`;

                const transporter = nodemailer.createTransport({
                    host: "smtp.eu.mailgun.org",
                    port: 587,
                    secure: false, // upgrade later with STARTTLS
                    auth: {
                        user: process.env.NODE_ENV ? process.env.MG_USER_2 : '',
                        pass: process.env.NODE_ENV ? process.env.MG_BIRO_WTF_P : ''
                    }
                });

                const mailOptions = {
                    from: 'iforgot@biro.wtf',
                    to: theUser.email,
                    subject: 'Password reset',
                    text: 'Hi '+theUser.name+'! Click this magic link to reset your password: ' + url
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
            });
        }
        req.session.sessionFlash = {
            type: 'success',
            message: 'If the given email address exists in our system, an e-mail should be on its way with the further steps.',
        };

        return next();
    };
};