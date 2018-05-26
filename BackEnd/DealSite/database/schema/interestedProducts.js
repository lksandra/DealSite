var mongoose = require('mongoose');
var schema = mongoose.Schema;

var objId = mongoose.Schema.Types.ObjectId;

//this schema is to collect the most viewed deals by the cutomers
var interestedProductSchema = new schema({
    name: {type: objId, ref: 'product', required: true},
    count: {type: Number, default: 1}
});

var interestedProducts = mongoose.model('interestedProduct', interestedProductSchema);
module.exports = interestedProducts;