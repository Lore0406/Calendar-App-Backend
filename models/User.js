// desestructuramos schema y model de mongoose
const { Schema, model } = require('mongoose')

// modelo del usuario para grabar en la BD
const UserSchema = Schema({
   name:{
      type: String, 
      require: true,
   },
   email:{
      type: String, 
      require: true,
      unique: true,
   }, 
   password:{
      type: String, 
      require: true,
   }
})

module.exports = model('User', UserSchema )