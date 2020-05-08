//Betolti az adott profil jelentkezeseit a db-bol, kilistazza az adatait
const utils = require('../../misc/utils');

module.exports = function (objectrepository) {
    const userModel = objectrepository.userModel;

    return async function (req, res, next) {
        let theApps = [];
        await userModel.findOne({ email: req.session.userMail }, (err, user) => {
            if (err) {
                return next(err);
            }
            theApps = user.apps;
        });

        let theMsgs = [];
        for (var anApp of theApps) {
            var d = new Date();
            const hours = d.getHours()-anApp.updated.getHours();
            const mins = d.getMinutes()-anApp.updated.getMinutes();
            const time = utils.displayET(hours, mins);

            await userModel.findOne({ _id: anApp.uid }, (err, user) => {
                if (err) {
                    return next(err);
                }

                if(user)
                    theMsgs.push({ name: user.name, email: user.email, img: user.img ? user.img : '/avatar-placeholder.gif', time: time});
            });
        }

        res.locals.messages = theMsgs;

        next();
    };
};