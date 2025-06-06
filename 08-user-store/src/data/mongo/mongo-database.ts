import mongoose from "mongoose";


interface Options {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  static async connect( options: Options ) {
    const { mongoUrl, dbName } = options;

    try {
      await mongoose.connect( mongoUrl, {
        dbName
      } );
      console.log('Database connected');
      return true;
    } catch (error) {
      console.error('Error al conectar a MongoDB:');
      console.error(`URL: ${mongoUrl}, DB: ${dbName}`);
      console.error(error);
      
      // Verificar si es un error de conexión
      if (error instanceof Error) {
        if (error.message.includes('ECONNREFUSED')) {
          console.error('No se pudo conectar a MongoDB. Asegúrate de que el servidor esté en ejecución.');
          throw new Error('Error de conexión: La base de datos MongoDB no está disponible. Verifica que Docker esté ejecutando el contenedor de MongoDB.');
        }
      }
      
      throw error;
    }
  }
}