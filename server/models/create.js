/**
 * Created by chrismolica on 3/4/15.
 */
paypal.payment.create(payment, function (error, payment) {
    if (error) {
        console.log(error);
    } else {
        if(payment.payer.payment_method === 'paypal') {
            req.session.paymentId = payment.id;
            var redirectUrl;
            for(var i=0; i < payment.links.length; i++) {
                var link = payment.links[i];
                if (link.method === 'REDIRECT') {
                    redirectUrl = link.href;
                }
            }
            res.redirect(redirectUrl);
        }
    }
});