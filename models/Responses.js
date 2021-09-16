const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let responseSchema = new Schema({
   userId:{
      type: mongoose.ObjectId,
      required: true
   },
   quizId : {
       type: Number,
       required: true
   },
   response:{
      type: Object,
      required: true
   }
},{
   timestamps: true
})
module.exports = mongoose.model('responses', responseSchema);