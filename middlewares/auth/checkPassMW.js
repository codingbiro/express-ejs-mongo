//Megnezi jo e a jelszo a belepesnel

module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (typeof req.body.password === 'undefined') {
            return next();
        }

        if (req.body.password === 'admin') {
            req.session.isLoggedIn = true;
            req.session.userMail = req.body.email;
            return req.session.save(err => {console.log("error: "+ err); res.redirect('/dashboard');});
        }

        res.locals.error = 'Invalid credentials!';
        return next();
    };
};