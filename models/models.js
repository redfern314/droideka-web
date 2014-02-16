var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

var droidSchema = mongoose.Schema({
	Bytes: String,
    reverse: String
});

module.exports = mongoose.model('droids', droidSchema);