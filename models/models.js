var mongoose = require('mongoose');

var droidSchema = mongoose.Schema({
    Bytes: String
});

var Droid = mongoose.model('Droid', droidSchema);

exports.Droid = Droid;