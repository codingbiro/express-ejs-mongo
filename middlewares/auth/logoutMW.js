//Logout

module.exports = function () {
    return function (req, res) {
        req.session.isLoggedIn = false;
        req.session.userMail = undefined;
        req.session.userId = undefined;
        req.session.userRole = undefined;

        return req.session.save(err => {
            if (err) {
                req.session.sessionFlash = {
                    type: 'danger',
                    message: 'DB error.',
                };
                
                return next(err);
            }

            req.session.sessionFlash = {
                type: 'success',
                message: 'Successful logout.',
            };
            res.redirect('/');
        });
    };
};