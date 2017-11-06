let mongoose = require('mongoose');
let Schema   = mongoose.Schema;
let bcrypt   = require('bcrypt-nodejs'); 

let Profile = new Schema({
    username: { type: String, required: true, unique: true  },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    about: { type: String },
    linkedIn: { type: String },
    location: { type: String },
    phone_number: { type: String },
    whatsapp: { type: String },
    instagram: { type: String },
    facebook: { type: String },
    cover_photo: { type: String },
    profile_picture: { type: String },
    edit_date: { type: Date, default: Date.now() }
});


// Profile.pre('save', function(next){
//     let profile = this; //Get a THIS element
  
//     bcrypt.hash(profile.password, null, null, function(err, hash){
//       if (err) return next(err);
//       profile.password = hash; //Make Hash to our password
//       next(); //Let to the function SAVA to run
//     });
// });

Profile.methods.checkPass = function(password) {
    if(this.password == password){
        return true
    } else {
        return false;
    }
    return false;
}

module.exports = mongoose.model('Profile', Profile);
