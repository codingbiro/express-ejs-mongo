//Logout

module.exports = function (objectrepository) {
    return function (req, res, next) {
        req.session.isLoggedIn = false;
        req.session.userMail = undefined;
        return req.session.save(err => { console.log("error: " + err); res.redirect('/login'); });
    };
};