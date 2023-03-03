// importamos JWT - Jason Web Token
const jwt = require('jsonwebtoken')

// generamos un JWT
const generateJWT = ( uid, name ) => {
   return new Promise ( ( resolve, reject ) =>{

      // el payload nunca contiene informacion sensible
      const payload = { uid, name }
      // generamos el token en base a un secreto y al payload
      jwt.sign( payload, process.env.SECRET_JWT_SEED, {
         expiresIn: '2h'
      }, ( err, token ) =>{

         if(err){
            console.log(err);
            reject( 'No se pudo generar el token' )
         }
         resolve( token )
      })
   })

}

module.exports = {
   generateJWT,
}