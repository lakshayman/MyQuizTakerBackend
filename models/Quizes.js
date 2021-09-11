const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let quizesSchema = new Schema({
   userId:{
      type: mongoose.ObjectId,
      required: true
   },
   quizes:{
      type: Array,
      required: true
   }
},{
   timestamps: true
})
module.exports = mongoose.model('quizes', quizesSchema);