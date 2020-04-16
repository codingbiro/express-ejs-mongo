//Megnezi jo e a jelszo a belepesnel

module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};