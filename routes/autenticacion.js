const express = require("express");
const rutas = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../database/db');
const jwt = require('jsonwebtoken');

rutas.get("/login", (req, res) => {
    let error
    res.render("login", {error: error});
});

rutas.post("/auth", (req, res) => {
    const { usuario, clave } = req.body;
    if (usuario && clave) {
        db.query('SELECT * FROM usuarios WHERE correo = ?', [usuario], (err, result) =>{
            if(result.length == 0 || !(bcrypt.compareSync(clave, result[0].clave))){
                res.render('login', { error: 'Usuario o clave incorrecta!' })
            } else {
                const vale = {'usuario': usuario, 'clave': clave}
                const token = jwt.sign({
                    exp: Math.floor(Date.now()/1000) + 180,
                    data: vale
                },
                    process.env.LLAVE_JWT);
                console.log(token);
                res.render('negocio', {token: token});
            }
        });
    }
});

rutas.get("/olvido", (req, res) => {
    res.render("olvido");
});

rutas.get("/recuperar", (req, res) => {
    res.render("recuperar");
});


module.exports = rutas;