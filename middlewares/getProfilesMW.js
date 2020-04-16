//Betolti a profilokat a db-bol, kilistazza a kepeket, leirasokat es oradijakat
const getUsers = require('../data/users')

module.exports = function (objectrepository) {
    return function (req, res, next) {
        const users = getUsers();
        res.locals.users = users;
        next();
    };
};