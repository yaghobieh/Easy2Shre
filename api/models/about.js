let mongoose = require('mongoose');
let Schema   = mongoose.Schema; //Create new mongoose schema

let AboutContent = new Schema({
    title: { type: String },
    sub_info: { type: String },
    about_section_title: {type: String},
    about_section: {type: String},
    facebook: {type: String},
    instagram: {type: String},
    email: {type: String},
    edit_date: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('About', AboutContent);