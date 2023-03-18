const express = require("express");
const rutas = express.Router();

rutas.get('/', function(req, res) {
    res.send(`<h3>Bienvenidos!</h3>`);
});