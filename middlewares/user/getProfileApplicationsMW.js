//Betolti az adott profil jelentkezeseit a db-bol, kilistazza az adatait
const utils = require('../../misc/utils');

module.exports = function (objectrepository) {
    const userModel = objectrepository.userModel;

    return async function (req, res, next) {
        let theApps = [];
        console.log(req.session.userMail);
        await userModel.findOne({ email: req.session.userMail }, (err, user) => {
            if (err) {
                req.session.sessionFlash = {
                    type: 'danger',
                    message: 'DB error.',
                };

                return next(err);
            }
            theApps = user.apps;
        });
        console.log(theApps);
        // Sorting the apps by their updated field
        theApps.sort((a,b) => (a.updated < b.updated) ? 1 : -1);

        let theMsgs = [];
        for (var anApp of theApps) {
            console.log(1)
            const time = utils.displayET(anApp.updated);

            await userModel.findOne({ _id: anApp.uid }, (err, user) => {
                if (err) {
                    req.session.sessionFlash = {
                        type: 'danger',
                        message: 'DB error.',
                    };

                    return next(err);
                }

                if (user)
                    theMsgs.push({ name: user.name, email: user.email, img: user.img ? user.img : 'assets/avatar-placeholder.gif', time: time });
            });
        }
        console.log(theMsgs);
        res.locals.messages = theMsgs;

        return next();
    };
};