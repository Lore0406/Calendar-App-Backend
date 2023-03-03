const express = require('express')
const { dbConnection } = require('./database/config')
const cors = require('cors')

// importamos variables de entorno
require('dotenv').config()

// Crear servidor de express
const app = express()

// Conectar la BD
dbConnection()

// CORS 
app.use( cors())

// Directorio Público
app.use( express.static( 'public' ) )

// Lectura y parseo del body
app.use( express.json() )

// Rutas
// Todo lo que se exporta de routes/auth se habilitará en la ruta /api/auth
app.use( '/api/auth', require( './routes/auth' ) )
// TODO: CRUD: eventos

// escuchar peticiones
app.listen( process.env.PORT, () =>{
   console.log(`Server running on port ${ process.env.PORT }`);
})