//Betolti az adott profil jelentkezeseit a db-bol, kilistazza az adatait
const getUsers = require('../data/users')

module.exports = function (objectrepository) {
    return function (req, res, next) {
        const users = getUsers();
        res.locals.messages = users;
        next();
    };
};