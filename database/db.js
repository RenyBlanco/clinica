const mysql = require('mysql');

//const { database } = require('../keys');

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

module.exports = db;