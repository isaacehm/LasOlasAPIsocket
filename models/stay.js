var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var staySchema = new Schema({  
	name:    { type: String },
	maxNumber:	{ type: Number }
});

module.exports = mongoose.model('Stay', staySchema); 