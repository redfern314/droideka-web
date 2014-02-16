var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

var droidSchema = mongoose.Schema({
	name: String,
    Bytes: String
});

module.exports = mongoose.model('droids', droidSchema);