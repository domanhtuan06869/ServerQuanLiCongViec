
const mongoose = require('mongoose');

const MenberProjectSchema = new mongoose.Schema({
    idproject:{
        type:String
    },name:{
        type:String
    },
    a0:{
        type:String
    },
    a1:{
    type:String
    },
    a2:{
    type:String
        },
    a3:{
     type:String
      },
      a4:{
        type:String
      }},{ versionKey: false });

const menberproject = mongoose.model('menberproject', MenberProjectSchema);

module.exports = menberproject;