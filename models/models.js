var mongoose = require('mongoose');

var droidSchema = mongoose.Schema({
	name: String,
    Bytes: String
});

var Droid = mongoose.model('Droid', droidSchema);

module.exports = Droid;