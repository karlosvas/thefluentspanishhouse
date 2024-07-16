import sqlite3 from 'sqlite3';

const dbPath = './mydatabase.db';

export function connectDB(): sqlite3.Database {
  return new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err.message);
      throw err;
    } else {
      console.log('Conectado a la base de datos SQLite');
    }
  });
}
