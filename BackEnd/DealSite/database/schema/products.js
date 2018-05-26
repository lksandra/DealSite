var mongoose = require('mongoose');
var schema = mongoose.Schema;
var objId = mongoose.Schema.Types.ObjectId;

//this is the main product schema.
var productSchema = new schema({
    name: {type: String, required: true},
    advertiser: {type: objId, ref: 'advertiser', required: true},
    category: {type:objId, ref: 'category'},
    description: {type: String},
    startDate: {type: Date },
    endDate: {type: Date},
    currency: {type: String, required: true},
    price: {type: Number},
    discount: {type: Number},
    url: {type: String, required: true},
    comments: {type: [objId], ref: 'comment'}

});

var product = mongoose.model('product', productSchema);
module.exports = product;