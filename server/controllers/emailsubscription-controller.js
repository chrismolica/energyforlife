/**
 * Created by chrismolica on 3/1/15.
 */
/**
 * Created by chrismolica on 2/24/15.
 */
var EmailSubscription = require('../models/emailsubscription')

module.exports.create = function(req, res){
    console.log(req.body);

    var subscription = new EmailSubscription(req.body);
    subscription.save(function(err,result){
        res.json(result);
    });
};


module.exports.list = function (req, res) {
    EmailSubscription.find({}, function(err, results){
        res.json(results);
    });
};
