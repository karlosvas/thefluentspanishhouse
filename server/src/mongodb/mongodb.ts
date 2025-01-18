import mongoose from 'mongoose';

// Conexion a la base de datos de MongoDBAtlas
export const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    try {
      const url = process.env.MONGO_DB_FLUENT;
      if (!url) throw new Error('Connection string not found');

      await mongoose.connect(url);
    } catch (error) {
      console.error('Error al conectarse a la base de datos: ', error);
    }
  }
};
