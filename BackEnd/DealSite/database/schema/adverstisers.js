var mongoose = require('mongoose');
var schema = mongoose.Schema;

//this is the schema for advertisers to register.
var advertiserSchema = new schema({
    name: {type: String, required: true, unique: true},
    
    publisherId: {type: Number}
});

var advertiser = mongoose.model('advertiser', advertiserSchema);
module.exports = advertiser;
