const express = require("express");
const rutas = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../database/db');
const jwt = require('jsonwebtoken');

rutas.get("/login", (req, res) => {
    let error
    res.render("login", {error: error});
});

rutas.post("/auth", async (req, res) => {
    const { usuario, clave } = req.body;
    if (usuario && clave) {
        db.query('SELECT * FROM usuarios WHERE correo = ?', [usuario], async (err, result) =>{
            if(result.length == 0 || ! await (bcrypt.compareSync(clave, result[0].clave))){
                res.render('login', { error: 'Usuario o clave incorrecta!' })
            } else {
                const id = result[0].id;
                const vale = {'id': id}
                const token = jwt.sign({
                    exp: Math.floor(Date.now()/1000) + 180,
                    data: vale
                },
                process.env.LLAVE_JWT);
                const cookieOptions = {
                    expire: new Date(Date.now() + 180 * 24 * 60 * 1000),
                    httpOnly: true
                }
                res.cookie('jwt', token, cookieOptions);
                res.render('negocio');
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