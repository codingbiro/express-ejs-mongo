//Authentikalja a felhasznalot

module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};