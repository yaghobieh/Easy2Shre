let mongoose = require('mongoose');
let Schema   = mongoose.Schema; //Create new mongoose schema
let bcrypt   = require('bcrypt-nodejs'); 

let profileSchema = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    profile_picture: {type: String},
    cover_photo: {type: String},
    facebook: {type: String},
    instagram: {type: String},
    whatsapp: {type: String},
    phone_number: {type: String},
    location: {type: String},
    linkedIn: {type: String},
    about: {type: String},
    edit_date: { type: Date, default: Date.now() }
});

profileSchema.pre('save', function(next){
    let profile = this; //Get a THIS element
  
    bcrypt.hash(profile.password, null, null, function(err, hash){
      if (err) return next(err);
      profile.password = hash; //Make Hash to our password
      next(); //Let to the function SAVE to run
    });
});

profileSchema.methods.comparePass = function(password){
    var profile = this;
    //Make compare between to password and return true/ false
    return bcrypt.compareSync(password, profile.password);
}

module.exports = mongoose.model('Profile', profileSchema);
