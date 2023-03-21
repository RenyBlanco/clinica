const express = require("express");
const rutas = express.Router();
const db = require('../database/db');

rutas.get('/modulos', (req, res) => {
    let mensaje = req.flash('msg');
    let tipo = req.flash('tipo')
    db.query('SELECT * FROM modulos', (err, result) =>{
        res.render('listamodulos', {modulos: result, mensaje: mensaje, tipo: tipo});
    });
});

rutas.post('/addModulos', async (req, res) => {
    const { modulo, estado } = req.body;
    let nuevo = {
        modulo: modulo,
        estado: estado
    }
    db.query('INSERT INTO modulos SET ?', [nuevo], (err, result) =>{
        if(err){
            req.flash('tipo', 'danger');
            req.flash('msg', 'Algo ocurrió, Modulo NO creado!');
            res.redirect('/modulos');
        }else{
            req.flash('tipo','success');
            req.flash('msg', 'Modulo creado con éxito');
            res.redirect('/modulos');
        }
    });
});

rutas.post('/editarMod', (req, res) => {
    const { idmodulos, modulo, estado } = req.body;
    let nuevo = {
        modulo: modulo,
        estado: estado
    }
    db.query('UPDATE modulos SET ? WHERE idmodulos = ?', [nuevo, idmodulos], (err, result) =>{
        if(err){
            req.flash('tipo', 'danger');
            req.flash('msg', 'Algo ocurrió, Modulo NO actualizado!');
            res.redirect('/modulos');
        }else{
            req.flash('tipo', 'success');
            req.flash('msg', 'Modulo actualizado con éxito');
            res.redirect('/modulos');
        }
    });
});

rutas.get('/eliminaMod/:id', (req, res) => {
    const {id}  = req.params;
    db.query('UPDATE modulos SET estado = 0 WHERE idmodulos = ?', [id], (err, result) => {
        if(err) {
            req.flash('tipo', 'danger');
            req.flash('msg', 'Algo ocurrió, Modulo NO pudo ser eliminado!');
            res.redirect('/modulos');
        }else{
            req.flash('tipo', 'success');
            req.flash('msg', 'Modulo eliminado con éxito');
            res.redirect('/modulos');
        }
    });
});

module.exports = rutas;