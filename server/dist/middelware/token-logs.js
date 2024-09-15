import admin from "../lib/firebase/firebase-config.js";
export async function log(req, res, next) {
    // Registro de la solicitud
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
}
export async function verifyIdToken(req, res, next) {
    // Validación de autenticación
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer "))
        return res.status(401).json({ message: "Unauthorized" });
    // Extrae el token de Firebase del encabezado de autorización, eliminadno el prefijo "Bearer "
    const token = authHeader.split(" ")[1];
    // Validación de token autorizado proporcionado por el cliente
    if (token === process.env.DEFAULT_TOKEN)
        return next();
    try {
        // Verifica el token de Firebase usando firebase-admin
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken; // Añade el usuario decodificado a la solicitud
        next();
    }
    catch (error) {
        console.log("Error verifying Firebase ID token:", error);
        return res.status(401).json({ message: "Unauthorized", error });
    }
}
