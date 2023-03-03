// desestructuramos schema y model de mongoose
const { Schema, model } = require('mongoose')

// modelo del evento para grabar en la BD
const EventSchema = Schema({
   title:{
      type: String, 
      required: true,
   },
   notes:{
      type: String, 
   }, 
   start:{
      type: Date, 
      required: true,
   },
   end:{
      type: Date, 
      required: true,
   },
   user:{
      type: Schema.Types.ObjectId, // referencia al UserSchema
      ref: 'User',
      required: true,
   }
})

// modificar/quitar la forma en la que se escriben ciertas propriedades del objeto
EventSchema.method('toJSON', function(){
   // quitamos __v y cambiamos _id por id
   const { __v, _id, ...object } = this.toObject()
   object.id= _id
   return object
})

module.exports = model('Event', EventSchema )