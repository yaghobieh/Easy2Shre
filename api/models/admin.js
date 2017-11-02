let mongoose = require('mongoose');
let Schema   = mongoose.Schema; 
let bcrypt   = require('bcrypt-nodejs'); 

let Admin = new Schema({
    full_name: {type: String, lowercase: true, required: true},
    username: {type: String, lowercase: true, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    phone_number: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

Admin.pre('save', function(next){
    let admin = this; //Get a THIS element
  
    bcrypt.hash(admin.password, null, null, function(err, hash){
      if (err) return next(err);
      admin.password = hash; //Make Hash to our password
      next(); //Let to the function SAVA to run
    });
});

Admin.methods.comparePass = function(password){
    //Make compare between to password and return true/ false
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('Admin', Admin);