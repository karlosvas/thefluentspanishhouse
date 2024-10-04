import dotenv from "dotenv";
dotenv.config();
///////////////////////////////////////////
import { connectDB } from "./mongodb/mongodb.js";
import express from "express";
import cors from "cors";
import { router } from "../routes/routes.js";
const app = express();
// Configuración global de CORS
const allowedOrigins = ["https://thefluentspanishhouse.com", process.env.URL_WEB_TEST, "http://localhost:5173"];
// Extendemos el límite para que pueda almacenar imagenes en base64
async function inicializeApp() {
    // Configuración global de CORS
    app.use(cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            }
            else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    }));
    app.use(express.json({ limit: "10mb" }));
    app.use(express.urlencoded({ limit: "10mb", extended: true }));
    app.use(express.json());
    // Conexión a la base de datos
    try {
        await connectDB();
    }
    catch (error) {
        throw new Error("Error connecting to the database");
    }
    app.get("/", (req, res) => {
        res.send("Welcome to thefluentespnaishouse server");
    });
    // Rutas de la aplicación
    app.use(router);
    // Obtener la URL de los preview para hacer testing
    app.get("/api/test", async (req, res) => {
        try {
            const previewUrl = process.env.VERCEL_URL;
            if (!previewUrl)
                throw new Error("VERCEL_URL no está definida");
            res.send(previewUrl);
        }
        catch (error) {
            res.status(500).json({ error: "Error en el servidor para obtener URL de preview" });
        }
    });
    const PORT_BACKEND = 8080;
    app.listen(PORT_BACKEND, () => {
        console.log(`Server runing: http://localhost:${PORT_BACKEND}`);
    });
}
inicializeApp().catch((error) => {
    console.error("Error starting the server:", error);
});
