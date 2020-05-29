const axios = require('axios');

// Barion test API base
const BASE_URL = 'https://api.test.barion.com/';

const PUBLIC_KEY = "86d23b226695401aafccec089b74df0a";
const PRIVATE_POS_KEY = "8cd4af88ffa5471e960b3de7adc8e68d";

const START = 'v2/payment/start';

const InputProperties = {
    "POSKey": "8cd4af88ffa5471e960b3de7adc8e68d",
    "PaymentType": "Immediate",
    "GuestCheckOut": "true",
    "FundingSources": ["All"],
    "PaymentRequestId": 'email',
    "RedirectUrl": "https://math.biro.wtf/thanks",
    "CallbackUrl": "https://math.biro.wtf",
    "Transactions": [{
        "POSTransactionId": 'email',
        "Payee": "quick.biro@gmail.com",
        "Total": 1000,
        "Items": [
            {
                "Name": "telescope",
                "Description": "haleluja",
                "Quantity": 1,
                "Unit": "db",
                "UnitPrice": 1000,
                "ItemTotal": 1000
            }
        ]
    }],
    "Locale": "hu-HU",
    "Currency": "EUR"
};

module.exports = function (objectrepository) {
    return function (req, res, next) {
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