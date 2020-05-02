// He belepve, redirect

module.exports = function (objectrepository) {
    return function (req, res, next) {
        console.log(req.session.isLoggedIn);
        if (typeof req.session.isLoggedIn !== 'undefined') {
            if(req.session.isLoggedIn === true)
                return res.redirect('/dashboard');
        }

        next();
    };
};