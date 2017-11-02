let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ClientInfo = new Schema({
    full_name: {type: String, required: true},
    phone_or_email: {type: String, required: true},
    checked: {type: Boolean, default: false},
    date_update: {type: Date, default: Date.now()}
})

module.exports =  mongoose.model('ClientInfo', ClientInfo);