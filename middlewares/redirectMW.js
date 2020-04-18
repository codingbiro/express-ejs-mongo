//Betolti az adott profil adatait a db-bol, kilistazza az adatait

module.exports = function (target) {
    return function (req, res) {
        res.redirect(`/${target}`);
    };
};