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

