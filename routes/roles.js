const express = require("express");
const rutas = express.Router();
const db = require('../database/db');

rutas.get('/roles', (req, res) => {
    let mensaje = req.flash('msg');
    let tipo = req.flash('tipo')
    db.query('SELECT * FROM roles', (err, result) =>{
        res.render('listaRoles', {roles: result, mensaje: mensaje, tipo: tipo});
    });
});

rutas.post('/addRoles', async (req, res) => {
    const { rol, estado } = req.body;
    let nuevo = {
        rol: rol,
        estado: estado
    }
    db.query('INSERT INTO roles SET ?', [nuevo], (err, result) =>{
        if(err){
            req.flash('tipo', 'danger');
            req.flash('msg', 'Algo ocurrió, Rol NO creado!');
            res.redirect('/roles');
        }else{
            req.flash('tipo','success');
            req.flash('msg', 'Rol creado con éxito');
            res.redirect('/roles');
        }
    });
});

rutas.post('/permisos', (req, res) => {
    const { id } = req.body;
    let rol = [];
    db.query('SELECT * FROM roles WHERE idroles = ?', [id], (err, result) =>{
        rol = result[0];
    });
    db.query('SELECT m.idmodulos, m.modulo, p.rol_id, p.insertar, p.modificar, p.borrar, p.ver FROM permisos p INNER JOIN modulos m ON p.modulo_id = m.idmodulos WHERE p.rol_id = ?', [id], (err, result) => {
        res.render('permisos', {permisos: result, rol: rol});
    });
    
});

rutas.post('/guardarPermisos', (req, res) => {
    const { id } = req.body;
    let rol = [];
    db.query('SELECT * FROM roles WHERE idroles = ?', [id], (err, result) =>{
        rol = result[0];
    });
    db.query('SELECT m.idmodulos, m.modulo, p.rol_id, p.insertar, p.modificar, p.borrar, p.ver FROM permisos p INNER JOIN modulos m ON p.modulo_id = m.idmodulos WHERE p.rol_id = ?', [id], (err, result) => {
        res.render('permisos', {permisos: result, rol: rol});
    });
    
})

rutas.post('/editarRol', (req, res) => {
    const { idroles, rol, estado } = req.body;
    let nuevo = {
        rol: rol,
        estado: estado
    }
    db.query('UPDATE roles SET ? WHERE idroles = ?', [nuevo, idroles], (err, result) =>{
        if(err){
            req.flash('tipo', 'danger');
            req.flash('msg', 'Algo ocurrió, Rol NO actualizado!');
            res.redirect('/roles');
        }else{
            req.flash('tipo', 'success');
            req.flash('msg', 'Rol actualizado con éxito');
            res.redirect('/roles');
        }
    });
});

rutas.get('/eliminaRol/:id', (req, res) => {
    const {id}  = req.params;
    db.query('UPDATE roles SET estado = 0 WHERE idroles = ?', [id], (err, result) => {
        if(err) {
            req.flash('tipo', 'danger');
            req.flash('msg', 'Algo ocurrió, Rol NO pudo ser eliminado!');
            res.redirect('/roles');
        }else{
            req.flash('tipo', 'success');
            req.flash('msg', 'Rol eliminado con éxito');
            res.redirect('/roles');
        }
    });
});

module.exports = rutas;