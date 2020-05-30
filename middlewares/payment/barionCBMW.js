const axios = require('axios');

// Barion test API base
const BASE_URL = 'https://api.test.barion.com/';

const PRIVATE_POS_KEY = "8cd4af88ffa5471e960b3de7adc8e68d";

const STATE = 'v2/payment/getpaymentstate';

module.exports = function (objectrepository) {
    //const userModel = objectrepository.userModel;

    return function (req, res, next) {
        let theid = 0;
        if (req.query.paymentId !== undefined) theid = req.query.paymentId;
        if (req.body !== undefined) console.log(req.body);
        console.log("theasd1: " + theid);
        return next();
        /*
            axios.post(BASE_URL + STATE, {
                "POSKey": PRIVATE_POS_KEY,
                "PaymentId": theid
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(function (response) {
                console.log(response);
                res.redirect(response.data.GatewayUrl);
            }).catch(function (error) {
                console.log(error);
                next();
            });*/
    };
};