import mongoose from 'mongoose';
// Mantiene viva la instancia en memoria durante toda la vida del proceso
let memoryServer = null;
// Conexion a la base de datos: MongoDB Atlas en producción, en memoria en tests
export const connectDB = async () => {
    if (mongoose.connection.readyState !== 0)
        return;
    try {
        let url;
        // En los tests usamos una base de datos en memoria, nunca la real.
        // El import es dinámico para que producción no cargue la devDependency.
        if (process.env.USE_MEMORY_DB === 'true') {
            const { MongoMemoryServer } = await import('mongodb-memory-server');
            const mongod = await MongoMemoryServer.create();
            memoryServer = mongod;
            url = mongod.getUri();
            console.log('Usando MongoDB en memoria para tests:', url);
        }
        else {
            url = process.env.MONGO_DB_FLUENT;
        }
        if (!url)
            throw new Error('Connection string not found');
        await mongoose.connect(url);
    }
    catch (error) {
        console.error('Error al conectarse a la base de datos: ', error);
    }
};
// Cierra la conexión y detiene la base de datos en memoria si existe
export const disconnectDB = async () => {
    await mongoose.disconnect();
    if (memoryServer) {
        await memoryServer.stop();
        memoryServer = null;
    }
};
