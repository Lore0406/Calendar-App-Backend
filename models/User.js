// desestructuramos schema y model de mongoose
const { Schema, model } = require('mongoose')

// modelo del usuario para grabar en la BD
const UserSchema = Schema({
   name:{
      type: String, 
      required: true,
   },
   email:{
      type: String, 
      required: true,
      unique: true,
   }, 
   password:{
      type: String, 
      required: true,
   }
})

module.exports = model('User', UserSchema )