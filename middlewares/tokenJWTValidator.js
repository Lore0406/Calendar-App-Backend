const { response } = require('express')
const jwt = require('jsonwebtoken')

const validateJWT = ( req, res = response, next ) => {

   const token = req.header('x-token')
   if ( !token ){
      return res.status(401).json({
         ok: false, 
         msg: 'Falta el token en la petición'
      })
   }

   try {
      // desestructuramos payload sacando el uid y el name
      const  { uid, name }  = jwt.verify(
         token, 
         process.env.SECRET_JWT_SEED
      )

      req.uid = uid 
      req.name = name

   } catch (error) {

      return res.status(401).json({
         ok: false, 
         msg:'Token no válido'
      }) 
      
   }
   
   next()
}

module.exports = {
   validateJWT,
}