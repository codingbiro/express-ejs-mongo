//Betolti a profilokat a db-bol, kilistazza a kepeket, leirasokat es oradijakat

module.exports = function (objectrepository) {
    const orderModel = objectrepository.orderModel;
    return function (req, res, next) {
        orderModel.find({ _user: req.session.userId }, (err, orders) => {
            if (err) {
                req.session.sessionFlash = {
                    type: 'danger',
                    message: 'DB error.',
                };

                return next(err);
            }
            res.locals.orders = orders;

            return next();
        });
    };
};