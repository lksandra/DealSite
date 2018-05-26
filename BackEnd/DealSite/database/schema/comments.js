var mongoose = require('mongoose');
var schema = mongoose.Schema;

//this schema is for the user comments for a given deal
var commentSchema = new schema({
    user: {type: String, default: 'Anonymous'},
    commnt: {type: String}
});

var comment = mongoose.model('comment', commentSchema);
module.exports = comment;