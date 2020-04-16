//Betolti az adott profilt a db-bol, kilistazza az adatait
const getUsers = require('../data/users')

module.exports = function (objectrepository) {
    return function (req, res, next) {
        const users = getUsers();
        let theid = 0;
        if(typeof req.params.id !== undefined) theid = req.params.id;
        res.locals.user = users[theid];
        next();
    };
};