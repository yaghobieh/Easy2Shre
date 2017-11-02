let mongoose = require('mongoose');
let Schema   = mongoose.Schema; //Create new mongoose schema

let TopContent = new Schema({
    title: { type: String },
    sub_title_text: { type: String },
    sub_info_top: { type: String },
    edit_date: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Top', TopContent);