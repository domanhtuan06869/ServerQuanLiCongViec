
const mongoose = require('mongoose');

const MenberWorkSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    }},{ versionKey: false });

const menberwork = mongoose.model('menberwork', MenberWorkSchema);

module.exports = menberwork;