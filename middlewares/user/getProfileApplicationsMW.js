//Betolti az adott profil jelentkezeseit a db-bol, kilistazza az adatait

module.exports = function (objectrepository) {
    return function (req, res, next) {
        // TODO messages implementation
        res.locals.messages = [];
        next();
    };
};