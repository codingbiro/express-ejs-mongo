//Megnezi jo e a jelszo a belepesnel

module.exports = function (objectrepository) {
    const userModel = objectrepository.userModel;

    return async function (req, res, next) {
        if (typeof req.body.password === 'undefined' || typeof req.body.email === 'undefined') {
            return next();
        }

        let theUser = null;

        await userModel.findOne({email: req.body.email}, (err, user) => {
            if (err) {
                console.log(err);
            }
            theUser = user;
        });
        
        if(theUser) {
            if (req.body.password === 'admin') {
                req.session.isLoggedIn = true;
                req.session.userMail = req.body.email;
                req.session.userId = theUser._id;
                return req.session.save(err => {console.log("error: "+ err); res.redirect('/dashboard');});
            }
        }
        res.locals.error = 'Invalid credentials!';
        return next();
    };
};