// Send an application to a teacher
const mongoose = require('mongoose');

module.exports = function (objectrepository) {
    const userModel = objectrepository.userModel;

    return function (req, res, next) {
        let theid = 0;

        if (typeof req.params.id !== undefined) theid = String(req.params.id);
        else return next('No matching profile');

        if (req.session.userId && req.session.userRole === "student") {
            const uId = String(req.session.userId);

            userModel.updateOne({ _id: theid },
                { $addToSet: { apps: [{ uid: mongoose.Types.ObjectId(uId) }] } },
                (err) => { if (err) { return next(err); } });
            userModel.updateOne({ _id: uId },
                { $addToSet: { apps: [{ uid: mongoose.Types.ObjectId(theid) }] } },
                (err) => { if (err) { return next(err); } });
        }
        else return next();

        res.redirect(`/profile/${theid}`);
    };
};