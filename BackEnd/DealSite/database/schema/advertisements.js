var mongoose = require('mongoose');
var schema = mongoose.Schema;

//this is the schema for any adverstisements that will be displayed on the website for the customers
var advertisementSchema = new schema( {
    type: String,
    name: String,
    url: {type: String}
});

var advertisement = mongoose.model('advertisement', advertisementSchema);
module.exports = advertisement;