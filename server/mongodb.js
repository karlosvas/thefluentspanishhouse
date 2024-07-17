import mongoose from "mongoose";

export const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(
        `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@cluster0.zym2dk8.mongodb.net/fluent`
      );
      console.log("Request finished!");
    } catch (error) {
      console.error("Error al conectarse a la base de datos: ", error);
    }
  }
};
