const mysql = require('mysql');
const { promisify } = require('util');

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.getConnection((err, connection) => {
    if(err){
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('La conexión fue cerrada');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Demasiadas conexiones abiertas');
        }
        if (err.code === 'ECONNREFUSED') { 
            console.error('La conexión fue rechazada');
        }
    }

    if (connection) connection.release();
    console.log('DB está conectada');
    return;
});

db.query = promisify(db.query);

module.exports = db;