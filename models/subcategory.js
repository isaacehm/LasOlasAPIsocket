var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var subcategorySchema = new Schema({  
	name:    { type: String },
	categoryId: 	{ type: String },
});

module.exports = mongoose.model('Subcategory', subcategorySchema); 