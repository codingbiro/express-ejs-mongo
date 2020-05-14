//Elmenti az adott profil adatait a db-be

module.exports = function (objectrepository) {
    const userModel = objectrepository.userModel;

    return function (req, res, next) {
        const desc = req.body.desc ? req.body.desc : null;
        const name = req.body.name ? req.body.name : null;
        const pass1 = req.body.pass1 ? req.body.pass1 : null;
        const pass2 = req.body.pass2 ? req.body.pass2 : null;
        const img = req.file ? req.file : null;
        const imgPath = img ? img.path : null;
        const city = req.body.city ? req.body.city : null;
        const price = req.body.price ? req.body.price : null;

        let pass = null;

        if (pass1 && pass2) {
            if (pass1 === pass2) {
                pass = String(pass1);
            }
            else {
                req.session.sessionFlash = {
                    type: 'danger',
                    message: 'Passwords do not match.',
                };

                return next();
            }
        }
        else {
            if (pass1) {
                req.session.sessionFlash = {
                    type: 'danger',
                    message: 'Passwords do not match.',
                };
            }
            if (pass2) {
                req.session.sessionFlash = {
                    type: 'danger',
                    message: 'Passwords do not match.',
                };
            }
        }

        userModel.updateOne({ _id: req.session.userId },
            {
                $set: {
                    desc: desc,
                    name: name,
                    price: Number(price),
                    city: city,
                    img: imgPath,
                }
            },
            (err) => {
                if (err) {
                    req.session.sessionFlash = {
                        type: 'danger',
                        message: 'DB error.',
                    };
                    return next(err);
                }
            });

        if (pass) {
            userModel.updateOne({ _id: req.session.userId },
                {
                    $set: {
                        password: pass,
                    },
                },
                (err) => {
                    if (err) {
                        req.session.sessionFlash = {
                            type: 'danger',
                            message: 'DB error.',
                        };

                        return next(err);
                    }
                });
        }
        req.session.sessionFlash = {
            type: 'success',
            message: 'Profile updating has been successful.',
        };

        return next();
    };
};