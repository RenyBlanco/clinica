const express = require("express");
const rutas = express.Router();

rutas.get("/login", (req, res) => {
    res.render("login");
});

rutas.post("/auth", async (req, res) => {
    const { usuario, clave } = req.body;
    if (usuario && clave) {
        db.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario], (err, result) =>{
            if(result.length == 0 || !(bcrypt.compareSync(clave, result[0].clave))){
                res.send('Usuario o Password incorrecto')
            }else{
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