//Reseteli a jelszot

module.exports = function (objectrepository) {
    return function (req, res, next) {
        // TODO
        req.session.sessionFlash = {
            type: 'success',
            message: 'We have sent you an e-mail with further instructions.',
        };

        return next();
    };
};