const express = require("express");
const rutas = express.Router();
const helpers = require('../libs/helpers');
const axios = require('axios');

rutas.get('/', function(req, res) {
    res.render("index" , {mensaje: '', tipo: ''});
});

rutas.get("/nosotros", (req, res) => {
    res.render("nosotros");
});

rutas.get("/servicios", (req, res) => {
    res.render("servicios");
});

rutas.get("/galeria", (req, res) => {
    res.render("galeria");
});

rutas.get("/contacto", (req, res) => {
    res.render("contacto");
});
  
rutas.get("/politicas", (req, res) => {
    res.render("politicas");
});

rutas.get("/negocio", helpers.autenticado, (req, res) => {
    res.render("negocio");
});

rutas.post("/guardaCita", (req, res) => {
    const { nombre, apellido, correo, rut, fecha, hora } = req.body;
    const nuevo = {
        nombre: nombre,
        apellido: apellido,
        rut: rut,
        correo: correo,
        fecha: fecha,
        hora: hora
    }
    try {
        axios.post('http://localhost:5000/api/v1/guardaCita', nuevo)
            .then(function (response) {
                let mensaje = response.data.msg;
                let tipo = response.data.tipo;
                res.render('index', { mensaje: mensaje, tipo: tipo });
            })
            .catch(function (error) {
                console.log('Mal ', error);
            });
    }catch(err){
        console.log(err)
    }
});

module.exports = rutas;