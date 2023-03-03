/*
Rutas de Eventos
host + /api/events
*/

// desestructuramos express sacando Router 
const { Router } = require( 'express' )
const router = Router()
// importamos validador de JWT token
const { validateJWT } = require('../middlewares/tokenJWTValidator')
// importamos check - middleware que se encarga de validar un campo a la vez
const { check } = require( 'express-validator' )
const { fieldValidator } = require('../middlewares/fieldValidator')
const { isDate } = require('../helpers/isDate')

const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/eventsController')


// Validar todas las rutas/endpoints que vienen a continuacion
// si se quisiera dejar una ruta pública esta senetancia se debería 
// poner después de la ruta pública
router.use( validateJWT )

// obtener eventos
router.get('/', getEvents)

// Crear un nuevo evento
router.post(
   '/',
   [
      check('title', 'El titulo es obligatorio').not().isEmpty(),
      check('start', 'Fecha de inicio es obligatoria').custom(isDate),
      check('end', 'Fecha de finalización es obligatoria').custom(isDate),
      fieldValidator
   ],
   createEvent,
)

// Actualizar evento
router.put(
   '/:id',
   [],
   updateEvent,
)

// Borrar evento
router.delete(
   '/:id',
   [],
   deleteEvent,
)


module.exports = router