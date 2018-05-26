var mongoose = require('mongoose');
var schema = mongoose.Schema;

//this schema is for recording all the categories of products that will be avaailbel
var categorySchema = new schema({
    name: {type: String, required: true, unique: true}
});

var category = mongoose.model('category', categorySchema);
module.exports = category;