/**
 * Created by chrismolica on 3/1/15.
 */
var mongoose = require('mongoose');

module.exports = mongoose.model('EmailSubscription', {
    email: String,
    timeAdded: { type: Date,default: Date.now},
    submitted: Boolean
});
