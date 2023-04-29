const mysql = require('mysql');
const { promisify } = require('util');

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'clinica'
});

db.connect((err) => {
    if(err){
        console.error('Error en conexión...!');
        return;
    }
    console.log('DB está conectada');
});

db.query = promisify(db.query);

module.exports = db;