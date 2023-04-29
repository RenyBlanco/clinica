const express = require("express");
const rutas = express.Router();
const axios = require('axios');

rutas.get('/modulos', async (req, res) => {
    let mensaje = req.flash('msg');
    let tipo = req.flash('tipo');
    try {
        const modulos = await axios.get("http://localhost:5000/api/v1/modulos");
        if(modulos.err){
            console.log(modulos.err)
        }else{
            res.render('listamodulos', {modulos: modulos.data, mensaje: mensaje, tipo: tipo});
        }
    }catch(err){
        console.log(err)
    }
});

rutas.post('/addModulos', async (req, res) => {
    const { modulo, estado } = req.body;
    let nuevo = {
        modulo: modulo,
        estado: estado
    }
    try {
        axios.post('http://localhost:5000/api/v1/addModulo', nuevo)
            .then(function (response) {
                let mensaje = response.data.msg;
                let tipo = response.data.tipo;
                axios.get("http://localhost:5000/api/v1/modulos")
                    .then((respuesta) => {
                    let modulos = respuesta.data;
                    res.render('listamodulos', { modulos: modulos, mensaje: mensaje, tipo: tipo });
                })
            })
            .catch(function (error) {
                console.log('Mal ', error);
            });
    }catch(err){
        console.log(err)
    }
});

rutas.post('/editarModulo', (req, res) => {
    const { idmodulos, modulo, estado } = req.body;
    let nuevo = {
        idmodulos: idmodulos,
        modulo: modulo,
        estado: estado
    }
    try {
        axios.post('http://localhost:5000/api/v1/editarModulo', nuevo)
            .then(function (response) {
                let mensaje = response.data.msg;
                let tipo = response.data.tipo;
                axios.get("http://localhost:5000/api/v1/modulos")
                    .then((respuesta) => {
                    let modulos = respuesta.data;
                    res.render('listamodulos', { modulos: modulos, mensaje: mensaje, tipo: tipo });
                })
            })
            .catch(function (error) {
                console.log('Mal ', error);
            });
    }catch(err){
        console.log(err)
    }
});

rutas.get('/eliminaModulo/:id', (req, res) => {
    const {id}  = req.params;
    try {
        axios.put('http://localhost:5000/api/v1/eliminaModulo/'+id)
            .then((respuesta) => {
                if (!respuesta.err) {
                    req.flash('tipo', 'success');
                    req.flash('msg', 'Módulo eliminado con éxito!');
                    res.redirect('/modulos');
                }else{
                    console.log(respuesta.err);
                }
            })
    } catch (error) {
        console.log(error)
    }
});

module.exports = rutas;