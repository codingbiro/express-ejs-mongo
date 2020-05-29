const axios = require('axios');

// Barion test API base
const BASE_URL = 'https://api.test.barion.com/';

const PUBLIC_KEY = "86d23b226695401aafccec089b74df0a";
const PRIVATE_POS_KEY = "8cd4af88ffa5471e960b3de7adc8e68d";

const START = 'v2/payment/start';

module.exports = function (objectrepository) {
    const userModel = objectrepository.userModel;

    return function (req, res, next) {
        let theid = 0;

        if (req.params.id !== undefined) theid = String(req.params.id);
        else {
            req.session.sessionFlash = {
                type: 'danger',
                message: 'Invalid user in the request.',
            };

            return next();
        }
        let theUser = undefined;
        userModel.findOne({ _id: theid }, (err, user) => {
            if (err) {
                req.session.sessionFlash = {
                    type: 'danger',
                    message: 'DB error.',
                };

                return next(err);
            }
            theUser = user;
        });

        if (theUser === undefined) {
            req.session.sessionFlash = {
                type: 'danger',
                message: 'Invalid user.',
            };

            return next();
        }

        const InputProperties = {
            "POSKey": "8cd4af88ffa5471e960b3de7adc8e68d",
            "PaymentType": "Immediate",
            "GuestCheckOut": "true",
            "FundingSources": ["All"],
            "PaymentRequestId": theUser.email,
            "RedirectUrl": "https://math.biro.wtf/thanks",
            "CallbackUrl": "https://math.biro.wtf",
            "Transactions": [{
                "POSTransactionId": theUser.email,
                "Payee": "quick.biro@gmail.com",
                "Total": theUser.price,
                "Items": [
                    {
                        "Name": theUser.name,
                        "Description": theUser.desc,
                        "Quantity": 1,
                        "Unit": "db",
                        "UnitPrice": theUser.price,
                        "ItemTotal": theUser.price
                    }
                ]
            }],
            "Locale": "hu-HU",
            "Currency": "EUR"
        };

        axios.post(BASE_URL + START, InputProperties, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(function (response) {
            console.log(response);
            res.redirect(response.data.GatewayUrl);
        }).catch(function (error) {
            console.log(error);
            next();
        });
    };
};