/**
 * Created by chrismolica on 2/24/15.
 */
var Meetup = require('../models/meetup')

module.exports.create = function(req, res){
    console.log(req.body);


    var meetup = new Meetup(req.body);
    meetup.save(function(err,result){
        res.json(result);
    });
};


module.exports.list = function (req, res) {
    Meetup.find({}, function(err, results){
        res.json(results);
    });
};
