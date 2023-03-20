const mysql = require('mysql');
const { promisify } = require('util');

const { database } = require('../keys');

const db = mysql.createPool({
    database
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