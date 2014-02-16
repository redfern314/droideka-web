var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

var droidSchema = mongoose.Schema({
	name: String,
    speed: String,
    direction: String,
    reverse: String
});

module.exports = mongoose.model('droids', droidSchema);