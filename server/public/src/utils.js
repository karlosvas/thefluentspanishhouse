import net from 'net';
export const startServer = async (port, app) => {
    // Encontramos un puerto libre de [8080, 8090]
    if (port > 9000) {
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
        startServer(port + 1, app);
    }
};
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
