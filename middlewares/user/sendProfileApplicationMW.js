// Send an application to a teacher
const mongoose = require('mongoose');

module.exports = function (objectrepository) {
    const userModel = objectrepository.userModel;

    return async function (req, res, next) {
        let theid = 0;
        let thelid = 0;

        if (req.params.id !== undefined) theid = String(req.params.id);
        if (req.params.lid !== undefined) thelid = String(req.params.lid);
        else {
            req.session.sessionFlash = {
                type: 'danger',
                message: 'Invalid user in the request.',
            };

            return next();
        }

        if (req.session.userId && req.session.userRole === "student") {
            const uId = String(req.session.userId);

            userModel.updateOne({ _id: theid },
                { $addToSet: { apps: [{ uid: mongoose.Types.ObjectId(uId), lid: mongoose.Types.ObjectId(thelid)}] } },
                (err) => {
                    if (err) {
                        req.session.sessionFlash = {
                            type: 'danger',
                            message: 'DB error.',
                        };

                        return next(err);
                    }
                });
            await userModel.updateOne({ _id: uId },
                { $addToSet: { apps: [{ uid: mongoose.Types.ObjectId(theid), lid: mongoose.Types.ObjectId(thelid) }] } },
                (err) => {
                    if (err) {
                        req.session.sessionFlash = {
                            type: 'danger',
                            message: 'DB error.',
                        };

                        return next(err);
                    }
                }
            );
            req.session.sessionFlash = {
                type: 'success',
                message: 'Your application has been submitted.',
            };

            return res.redirect(`/profile/${theid}`);
        }
        else {
            req.session.sessionFlash = {
                type: 'danger',
                message: 'Only students can apply for lessons.',
            };

            return res.redirect(`/profile/${theid}`);
        }
    };
};