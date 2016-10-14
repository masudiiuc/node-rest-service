var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    name : String, 
    password : String, 
    admin : Boolean
})

module.exports = mongoose.model('User', UserSchema);