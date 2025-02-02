import dotenv from 'dotenv';
dotenv.config();
///////////////////////////////////////////
import { connectDB } from './mongodb/mongodb.js';
import express from 'express';
import cors from 'cors';
import router from '../routes/routes.js';
import { startServer } from './utils.js';
// Extendemos el límite para que pueda almacenar imagenes en base64
async function inicializeApp() {
    const app = express();
    // Origenes permitidos
    const allowedOrigins = [
        'https://thefluentspanishhouse.com',
        'https://thefluentspanishhouse-client-git-testing-karlosvas-projects.com',
        /^http:\/\/localhost(:\d+)?$/,
    ];
    // Configuración global de CORS
    app.use(cors({
        origin: function (origin, callback) {
            // Si no hay origen (ej: misma origen) o es una solicitud local
            if (!origin)
                return callback(null, true);
            // Verifica si el origen comienza con las URLs permitidas
            const isAllowedDomain = allowedOrigins.some((allowed) => {
                if (allowed instanceof RegExp) {
                    return allowed.test(origin);
                }
                return origin.startsWith(allowed);
            });
            if (isAllowedDomain)
                return callback(null, true);
            callback(new Error('Not allowed by CORS'));
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    }));
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ limit: '10mb', extended: true }));
    app.use(express.json());
    app.use(express.text());
    // Conexión a la base de datos
    try {
        await connectDB();
    }
    catch (error) {
        throw new Error('Error connecting to the database');
    }
    // Enpoint de bienvenida
    app.get('/', (_req, res) => {
        res.send('Welcome to thefluentespnaishouse server');
    });
    // Rutas de la aplicación
    app.use(router);
    // Obtener la URL de los preview para hacer testing
    app.get('/api/test', async (_req, res) => {
        try {
            const previewUrl = process.env.VERCEL_URL;
            if (!previewUrl)
                throw new Error('VERCEL_URL no está definida');
            res.json({ url: previewUrl });
        }
        catch (error) {
            res
                .status(500)
                .json({ error: 'Error en el servidor para obtener URL de preview' });
        }
    });
    // Si es development y preview asignamos el puerto disponible a partir de 8080
    const PORT_BACKEND = process.env.PORT || 8080;
    if (process.env.NODE_ENV !== 'production') {
        // Creamos el servidor en el puerto disponible entre el 8080 y el 9000
        startServer(8080, app).catch((error) => console.error('Error starting the server:', error));
    }
    else {
        app.listen(PORT_BACKEND, () => console.log(`Server running: http://localhost:${PORT_BACKEND}`));
    }
}
inicializeApp().catch((error) => {
    console.error('Error starting the server:', error);
});
