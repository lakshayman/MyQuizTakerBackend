const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let userSchema = new Schema({
   name:{
      type: String,
      required: true
   },
   emailid:{
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   }
},{
   timestamps: true
})
module.exports = mongoose.model('users', userSchema);