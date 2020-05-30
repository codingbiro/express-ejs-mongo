// TODO hiba miert fut le
const axios = require('axios');
require('dotenv').config();

// Barion strings
const BASE_URL = process.env.NODE_ENV ? process.env.BARION_API_BASE : 'https://api.test.barion.com/';
const PRIVATE_POS_KEY = process.env.NODE_ENV ? process.env.BARION_API_KEY : "8cd4af88ffa5471e960b3de7adc8e68d";

const START = 'v2/payment/start';

module.exports = function (objectrepository) {
    const userModel = objectrepository.userModel;
    const orderModel = objectrepository.orderModel;

    return async function (req, res, next) {
        const theid = String(req.params.id);
        const thelid = String(req.params.lid);
        let theUser = null;

        await userModel.findOne({ _id: theid }, (err, user) => {
            if (err) {
                req.session.sessionFlash = {
                    type: 'danger',
                    message: 'DB error.',
                };

                return next(err);
            }
            theUser = user;
        });

        // Ez neha igaz, miert
        if (theUser == null) {
            return next('hiba');
        }

        const InputProperties = {
            "POSKey": PRIVATE_POS_KEY,
            "PaymentType": "Immediate",
            "GuestCheckOut": "true",
            "FundingSources": ["All"],
            "PaymentRequestId": req.session.userId + theUser.email,
            "RedirectUrl": "https://math.biro.wtf/thanks",
            "CallbackUrl": "https://math.biro.wtf",
            "Transactions": [{
                "POSTransactionId": req.session.userId + theUser.email,
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
            orderModel.create({ title: theUser.name, desc: theUser.desc, state: response.data.Status, total: theUser.price, pid: response.data.PaymentId, _user: req.session.userId, teacher: theid, lid: thelid }, (err) => {
                if (err) {
                    req.session.sessionFlash = {
                        type: 'danger',
                        message: 'DB error.',
                    };

                    return next(err);
                }
            });
            res.redirect(response.data.GatewayUrl);
        }).catch(function (error) {
            console.log(error);
            next();
        });
    };
};