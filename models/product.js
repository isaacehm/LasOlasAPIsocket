var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var productSchema = new Schema({  
	name:    { type: String },
	stock:     { type: Number },
	price:  { type: String },
	categoryId:    { type: String },
	subcategoryId:    { type: String },
	icon:    { type: String }
});

module.exports = mongoose.model('Product', productSchema); 