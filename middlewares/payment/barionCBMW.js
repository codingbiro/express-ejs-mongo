const axios = require('axios');
require('dotenv').config();

// Barion strings
const BASE_URL = process.env.NODE_ENV ? process.env.BARION_API_BASE : 'https://api.test.barion.com/';
const PRIVATE_POS_KEY = process.env.NODE_ENV ? process.env.BARION_API_KEY : "8cd4af88ffa5471e960b3de7adc8e68d";

const STATE = 'v2/payment/getpaymentstate';

module.exports = function (objectrepository) {
    const orderModel = objectrepository.orderModel;

    return function (req, res, next) {
        const theid = req.query.paymentId;
        const PARAMS = `?POSKey=${PRIVATE_POS_KEY}&PaymentId=${theid}`;

        axios.get(BASE_URL + STATE + PARAMS).then(function (response) {
            if (response) {
                orderModel.updateOne({ pid: theid },
                    {
                        $set: {
                            state: response.data.Status,
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
                        return next();
                    });
            }
        }).catch(function (error) {
            console.log(error);
            return next(error);
        });
    };
};