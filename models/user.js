var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var userSchema = new Schema({  
  name:    { type: String },
  username:     { type: String },
  password:  { type: String },
  type:    { type: String, enum:
  ['Administrator', 'Common']
        }
});

module.exports = mongoose.model('User', userSchema); 