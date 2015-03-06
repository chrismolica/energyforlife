/**
 * Created by chrismolica on 3/4/15.
 */
var paypal = require('paypal-rest-sdk');
var config = {};
/*
 * GET home page.
 */

exports.index = function(req, res){
    res.render('index', { title: 'Express' });
};

/*
 * SDK configuration
 */

exports.init = function(c){
    config = c;
    paypal.configure(c.api);
    //status = {};
};

//var config = require("config3");
//var paypal_api = require("paypal-rest-sdk");
//paypal_api.configure(config.paypal);
//var log = require("app/log");

//function pay(creditCard, amount, description, callback) {
//    var paypalOptions = {
//        intent: "sale",
//        payer: {
//            payment_method: "credit_card",
//            funding_instruments: [{credit_card: creditCard}]
//        },
//        transactions: [{
//            amount: {
//                total: amount,
//                currency: "USD"
//            },
//            description: description
//        }]
//    };
//    if (config.paypal.enabled) {
//        paypal_api.payment.create(paypalOptions, function (error, response) {
//            log.debug({
//                err: error,
//                response: response || (error && error.response)
//            }, "paypal payment response");
//            callback(error, response);
//        });
//    } else {
//        setImmediate(function () {
//            callback(null, {"fakePaypal": "is fake"});
//        });
//    }
//}
exports.create = function (req, res) {
    console.log("INPUT SERVERSIDE:"+req.body);
    console.log(req.body);
    console.log(req.body.amount);

    var method = req.body.method;
    var payment = {
        "intent": "sale",
        "payer": {
        },
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": req.body.amount
                //"total": "1.00"
            },
            "description": "NONE"
        }]
    };
    if (method === 'credit_card') {
        var funding_instruments = [
            {
                "credit_card": {
                    "number": req.body.cardnumber,
                    "type": req.body.cardtype.toLowerCase(),
                    "expire_month": req.body.expire_month,
                    "expire_year": req.body.expire_year,
                    "cvv2": req.body.cvv2,
                    "first_name": req.body.first_name,
                    "last_name": req.body.last_name
                }
                //"credit_card": {
                //    "number": "5500005555555559",
                //    "type": "mastercard",
                //    "expire_month": 12,
                //    "expire_year": 2018,
                //    "cvv2": 111,
                //    "first_name": "Joe",
                //    "last_name": "Shopper"
                //}
            }
        ];
        console.log('INPUTED CREDIT CARD INFO:');
        console.log(funding_instruments);
        payment.payer.payment_method = 'credit_card';
        payment.payer.funding_instruments = funding_instruments;
    }

    paypal.payment.create(payment, function (error, payment) {
        //console.log(output.id);
        if (error) {
            console.log('ERROR');
            console.log(error);
            console.log('ERROR EXPAND');
            console.log(JSON.stringify(error, null, 2));
            //res.send('VALIDATION ERROR');
            //res.json('DID WE DO IT');
            res.send(error);
            //res.render('error', { 'error': error });
        } else {
            //req.session.paymentId = payment.id;
            //res.render('create', { 'payment': payment });
            status = payment;
            console.log(payment);
            console.log("SUCCESS:"+payment.id);
            res.send(payment);
        }

    });
};

//exports.create = function(req, res){
//    var payment = {
//        "intent": "sale",
//        "payer": {
//            "payment_method": "credit_card",
//            "funding_instruments": [{
//                "credit_card": {
//                    "number": "5500005555555559",
//                    "type": "mastercard",
//                    "expire_month": 12,
//                    "expire_year": 2018,
//                    "cvv2": 111,
//                    "first_name": "Joe",
//                    "last_name": "Shopper"
//                }
//            }]
//        },
//        "transactions": [{
//            "amount": {
//                "total": "5.00",
//                "currency": "USD"
//            },
//            "description": "My awesome payment"
//        }]
//    };
//    paypal.payment.create(payment, function (error, payment) {
//        if (error) {
//            console.log(error);
//        } else {
//            if(payment.payer.payment_method === 'paypal') {
//                req.session.paymentId = payment.id;
//                var redirectUrl;
//                for(var i=0; i < payment.links.length; i++) {
//                    var link = payment.links[i];
//                    if (link.method === 'REDIRECT') {
//                        redirectUrl = link.href;
//                    }
//                }
//                res.redirect(redirectUrl);
//            }
//        }
//    });
//};

exports.execute = function(req, res){
    var paymentId = req.session.paymentId;
    var payerId = req.param('PayerID');

    var details = { "payer_id": payerId };
    paypal.payment.execute(paymentId, details, function (error, payment) {
        if (error) {
            console.log(error);
        } else {
            res.send("Hell yeah!");
        }
    });
};

exports.cancel = function(req, res){
    res.send("The payment got canceled");
};

