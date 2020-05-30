const utils = require('../../misc/utils');

module.exports = function (objectrepository) {
    const userModel = objectrepository.userModel;
    const orderModel = objectrepository.orderModel;

    return async function (req, res, next) {
        let theApps = [];

        if (typeof res.locals != 'undefined' && res.locals.user != null) theApps = res.locals.user.apps;

        theApps.sort((a, b) => (a.updated < b.updated) ? 1 : -1);

        let theMsgs = [];
        for (var anApp of theApps) {
            let theUser = null;
            let theOrders = [];
            const time = utils.displayET(anApp.updated);

            await userModel.findOne({ _id: anApp.uid }, (err, user) => {
                if (err) {
                    req.session.sessionFlash = {
                        type: 'danger',
                        message: 'DB error.',
                    };

                    return next(err);
                }
                theUser = user;
            });

            await orderModel.find({ lid: anApp.lid }, (err, orders) => {
                if (err) {
                    req.session.sessionFlash = {
                        type: 'danger',
                        message: 'DB error.',
                    };
                    return next(err);
                }
                theOrders = orders;
                console.log('hey: ');
                console.log(orders);
            });
            console.log(anApp.lid);
            console.log(anApp.uid);
            console.log(res.locals.user.role);
            console.log(req.session.userId);
            console.log(theOrders);
            let theOrder = [];
            if (res.locals.user.role === 'student') theOrder = theOrders.filter(o => o._user == req.session.userId);
            if (res.locals.user.role === 'teacher') theOrder = theOrders.filter(o => o._user == anApp.uid);
            let theState = '';
            if (theOrder.length === 1) theState = theOrder[0].state;
            console.log(theOrder);
            console.log('a');
            console.log(theState);
            console.log('b');
            theMsgs.push({ uid: theUser._id, name: theUser.name, email: theUser.email, img: theUser.img ? theUser.img : 'assets/avatar-placeholder.gif', time: time, lid: anApp.lid, state: theState });
        }

        res.locals.messages = theMsgs;

        return next();
    }
};