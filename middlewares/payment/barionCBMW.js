const axios = require('axios');

// Barion test API base
const BASE_URL = 'https://api.test.barion.com/';

const PRIVATE_POS_KEY = "8cd4af88ffa5471e960b3de7adc8e68d";

const STATE = 'v2/payment/getpaymentstate';

module.exports = function (objectrepository) {
    const orderModel = objectrepository.orderModel;

    return async function (req, res, next) {
        let theid = 0;
        if (req.query.paymentId !== undefined) theid = req.query.paymentId;

        const PARAMS = `?POSKey=${PRIVATE_POS_KEY}&PaymentId=${theid}`;

        await axios.get(BASE_URL + STATE + PARAMS).then(function (response) {
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
                    });
            }
        }).catch(function (error) {
            console.log(error);            
        });
        
        return next();
    };
};