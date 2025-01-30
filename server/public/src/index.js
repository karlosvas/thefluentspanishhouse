import dotenv from 'dotenv';
dotenv.config();
///////////////////////////////////////////
import { connectDB } from './mongodb/mongodb.js';
import express from 'express';
import cors from 'cors';
import { router } from '../routes/routes.js';
import net from 'net';
// Extendemos el límite para que pueda almacenar imagenes en base64
async function inicializeApp() {
    const app = express();
    // Origenes permitidos
    const allowedOrigins = [
        process.env.URL_WEB,
        /^http:\/\/localhost(:\d+)?$/,
        process.env.URL_WEB_TEST,
    ];
    // Configuración global de CORS
    app.use(cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            }
            else {
                callback(new Error('Not allowed by CORS'));
            }
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
    app.get('/', (req, res) => {
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
            res.send(previewUrl);
        }
        catch (error) {
            res
                .status(500)
                .json({ error: 'Error en el servidor para obtener URL de preview' });
        }
    });
    // Si es development y preview asignamos el puerto disponible a partir de 8080
    if (process.env.NODE_ENV !== 'production') {
        const PORT_BACKEND = 8080;
        // Creamos una funcion flecha que devuelbe una promesa
        const checkPort = (port) => {
            return new Promise((resolve, reject) => {
                // Creamos un servidor con net nativo de (NodeJS)
                const server = net.createServer();
                // Intentar escuchar en el puerto
                server.listen(port);
                // Verificamos si el puerto esta en uso si lo esta devuleve false, si ocurre un error lo rechaza
                server.once('error', (err) => {
                    if (err.code === 'EADDRINUSE') {
                        resolve(false);
                    }
                    else {
                        reject(err);
                    }
                });
                // Si el puerto esta libre lo cerramos y resolvemos la promesa
                server.once('listening', () => {
                    server.close();
                    resolve(true);
                });
            });
        };
        const startServer = async (port) => {
            // Encontramos un puerto libre de [8080, 8090]
            if (port > 8090) {
                console.log('No ports available');
                return;
            }
            // Encontra un puerto libre y se lo asigna al servidor, si no encuentra uno libre lo asigna al siguiente
            const isPortFree = await checkPort(port);
            if (isPortFree) {
                app.listen(port, () => {
                    console.log(`Server running: http://localhost:${port}`);
                });
            }
            else {
                console.log(`Port ${port} is in use, please choose another port.`);
                startServer(port + 1);
            }
        };
        startServer(PORT_BACKEND).catch((error) => {
            console.error('Error starting the server:', error);
        });
    }
    else {
        const PORT_BACKEND = 8080;
        app.listen(PORT_BACKEND, () => {
            console.log(`Server runing: http://localhost:${PORT_BACKEND}`);
        });
    }
}
inicializeApp().catch((error) => {
    console.error('Error starting the server:', error);
});
