// importamos express para que nos ayude con las inteli...
const { response } = require('express')
const Event = require('../models/Event')

const getEvents = async (req, res = response) => {

   // sacamos solo el nombre y el id del usuario con el populate
   const events = await Event.find()
                             .populate('user', 'name') 

   res.status(201).json({
      ok: true,
      events
   })
}

const createEvent = async (req, res = response) => {

   const event = new Event( req.body )

   try {
      event.user = req.uid
      const eventSaved = await event.save()
      res.json({
         ok: true,
         event: eventSaved
      })
   } catch (error) {
      console.log(error)
      res.status(500).json({
         ok: false, 
         msg:'Contacte con el Administrador'
      })
   }
 
}

const updateEvent = async (req, res = response) => {

   const eventId = req.params.id
   const uid = req.uid

   try {
      const event = await Event.findById( eventId )
      if ( !event ){
         return res.status(404).json({
            ok: false,
            msg: 'No existe ningún evento con el id proporcionado'
         })
      }

      if ( event.user.toString() !== uid ){
         // console.log('event user id:',event.user.toString())
         // console.log('id', uid);
         return res.status(401).json({
            ok: false, 
            msg: 'No está autorizado para editar este evento'
         })
      }

      const newEvent = {
         ...req.body,
         user: uid,
      }

      const updateEvent = await Event.findByIdAndUpdate( eventId, newEvent, { new: true } )

      res.json({
         ok: true,
         event: updateEvent
      })
      
   } catch (error) {
      console.log(error)
      res.status(500).json({
         ok: false, 
         msg:'Contacte con el administrador'
      })
   }
}

const deleteEvent = async (req, res = response) => {

   const eventId = req.params.id
   const uid = req.uid

   try {
      const event = await Event.findById( eventId )
      if ( !event ){
         return res.status(404).json({
            ok: false,
            msg: 'No existe ningún evento con el id proporcionado'
         })
      }

      if ( event.user.toString() !== uid ){
        
         return res.status(401).json({
            ok: false, 
            msg: 'No está autorizado para eliminar este evento'
         })
      }


      await Event.findByIdAndDelete( eventId )

      res.json({
         ok: true,
         msg: 'Evento eliminado satisfactoriamente'
      })
      
   } catch (error) {
      console.log(error)
      res.status(500).json({
         ok: false, 
         msg:'Contacte con el administrador'
      })
   }
}

module.exports = {
   getEvents, 
   createEvent, 
   updateEvent, 
   deleteEvent, 
}



