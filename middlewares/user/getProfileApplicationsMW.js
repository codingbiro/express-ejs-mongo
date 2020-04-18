//Betolti az adott profil jelentkezeseit a db-bol, kilistazza az adatait

module.exports = function (objectrepository) {
    return function (req, res, next) {
        res.locals.messages = [];
        next();
    };
};