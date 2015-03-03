/**
 * Created by chrismolica on 2/24/15.
 */
var mongoose = require('mongoose');

module.exports = mongoose.model('Meetup', {
    name: String,
});
