var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var orderSchema = new Schema({  
  employee:    { type: String },
  stay: 	{ type: String },
  stayNumber: { type: Number },
  products:  [],
  status: { type: String, enum: ['Pendiente', 'Procesada', 'Cobrada'], default: 'Pendiente' },
  total: 	{ type: String },
  date:     { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema); 