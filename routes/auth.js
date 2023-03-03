/*
Rutas de Usuarios/Auth
host + /api/auth
*/

// desestructuramos express sacando Router 
const { Router } = require( 'express' )
const router = Router()

// importamos check - middleware que se encarga de validar un campo a la vez
const { check } = require( 'express-validator' )

// importamos las funciones para crear las rutas
const { createUser, loginUser, renewToken } = require( '../controllers/authController' )
const { fieldValidator } = require('../middlewares/fieldValidator')

// importamos validador de JWT token
const { validateJWT } = require('../middlewares/tokenJWTValidator')

router.post( 
   '/',
   [ // middleware
      check('email', 'El email es obligatorio').isEmail(),
      check('password', 'La contraseña debe tener 6 carácteres').isLength({ min: 6 }),
      fieldValidator
   ], 
   loginUser 
   )

router.post(
   '/new', 
   [ // middleware
      check('name', 'El nombre es obligatorio').not().isEmpty(),
      check('email', 'El email es obligatorio').isEmail(),
      check('password', 'La contraseña debe tener 6 carácteres').isLength({ min: 6 }),
      fieldValidator
   ], 
   createUser,
)

router.get( '/renew', validateJWT, renewToken )

module.exports = router 