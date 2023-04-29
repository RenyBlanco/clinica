const express = require("express");
const rutas = express.Router();
const helpers = require('../libs/helpers');

rutas.get('/', function(req, res) {
    res.render("index");
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

module.exports = rutas;