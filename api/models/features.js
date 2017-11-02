let mongoose = require('mongoose');
let Schema   = mongoose.Schema; //Create new mongoose schema

let FeaturesContent = new Schema({
    title: { type: String },
    sub_info: { type: String },
    edit_date: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Features', FeaturesContent);