// configurar mongoose
const mongoose = require('mongoose')

const dbConnection = async() => {
   try{
      // usamos la variable del entorno para hacer la conexión 
      await mongoose.connect(process.env.DB_CNN) 
      console.log('DB Connected');
   } catch (error){
      console.log(error)
      throw new Error('Error connecting with DB')
   }
}

module.exports = {
   dbConnection,
}