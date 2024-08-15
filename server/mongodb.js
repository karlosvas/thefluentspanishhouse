import mongoose from "mongoose";

// Conexion a la base de datos de MongoDBAtlas
export const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(process.env.MONGO_DB_FLUENT);
    } catch (error) {
      console.error("Error al conectarse a la base de datos: ", error);
    }
  }
};
