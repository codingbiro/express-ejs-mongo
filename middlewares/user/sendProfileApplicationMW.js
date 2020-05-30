// TODO check if lesson exists
const mongoose = require('mongoose');

module.exports = function (objectrepository) {
    const userModel = objectrepository.userModel;

    return async function (req, res, next) {
        let theid = 0;
        let thelid = 0;

        theid = String(req.params.id);
        thelid = String(req.params.lid);

        if (req.session.userId && req.session.userRole === "student") {
            const uId = String(req.session.userId);

            const apps = res.locals.user.apps;
            if (apps.find((app) => (app.lid != undefined) ? (String(app.lid) === thelid ? true : false) : false) != undefined) {
                req.session.sessionFlash = {
                    type: 'danger',
                    message: 'You have already applied for this lesson.',
                };

                return res.redirect(`/profile/${theid}`);
            }

            await userModel.updateOne({ _id: theid },
                { $addToSet: { apps: [{ uid: mongoose.Types.ObjectId(uId), lid: mongoose.Types.ObjectId(thelid) }] } },
                (err) => {
                    if (err) {
                        req.session.sessionFlash = {
                            type: 'danger',
                            message: 'DB error.',
                        };

                        return res.redirect(`/profile/${theid}`);
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

                        return res.redirect(`/profile/${theid}`);
                    }
                });

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