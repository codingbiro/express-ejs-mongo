// Register

module.exports = function (objectrepository) {
    return function (req, res, next) {
        res.locals.registered = true;
        next();
    };
};