//Betolti az adott profil jelentkezeseit a db-bol, kilistazza az adatait

module.exports = function (objectrepository) {
    return function (req, res, next) {
        const users = getUsers();
        res.locals.messages = users;
        next();
    };
};