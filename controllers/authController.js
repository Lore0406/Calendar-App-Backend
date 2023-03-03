// importamos express para que nos ayude con las inteli...
const { response } = require( 'express' )
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const { generateJWT } = require('../helpers/jwt')

const createUser = async ( req, res = response ) => {

   // desestructuramos el req.body para sacar la información del json
   const { email, password } = req.body

   try {

      // comprobamos si el correo está en la BD 
      let user = await User.findOne({ email: email })

      if ( user ) {
         return res.status(400).json({
            ok: false,
            msg:'El correo que ha utilizado está registrado'
         })
      }
      // hacemos una nueva instancia del modelo de usuario 
      user = new User( req.body )

      // encriptar la contraseña 
      const salt = bcrypt.genSaltSync()
      user.password = bcrypt.hashSync( password, salt )

      // guardamos el usuario en la BD 
      await user.save()

      // generar - Jason Web Token JWT
      const token = await generateJWT( user.id, user.name )
     
   
      res.status(201).json({
         ok: true,
         uid: user.id, 
         name: user.name,
         token,
      })

   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg:'Por favor contacte con el administrador'
      })
   }
}

const renewToken = async( req, res = response ) => {
   
   // desestructuramos req extrayendo uid y name 
   const { uid, name } = req

   // renovamos el token re-generandolo
   const token = await generateJWT( uid, name )

   res.json({
      ok: true, 
      token,
   })
}

const loginUser = async( req, res = response ) => {

   // desestructuramos el req.body para sacar la información del json
   const { email, password } = req.body

   try {
      // comprobamos si el correo está en la BD 
      const user = await User.findOne({ email: email })

      if ( !user ) {
         return res.status(400).json({
            ok: false,
            msg:'El correo proporcionado no pertence a ningún usuario registrado'
         })
      }

      // confirmar las contraseñas 
      const validPassword = bcrypt.compareSync( password, user.password )

      if( !validPassword ){
         return res.status(400).json({
            ok: false, 
            msg:'Contraseña incorrecta'
         })
      }

      // generar - Jason Web Token JWT
      const token = await generateJWT( user.id, user.name )

      res.json({
         ok: true, 
         uid: user.id, 
         name: user.name, 
         token,
      })
  
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg:'Por favor contacte con el administrador'
      })
   }
}

module.exports = {
   createUser,
   renewToken,
   loginUser,
}