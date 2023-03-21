const express = require("express");
const rutas = express.Router();
const helpers = require('../libs/helpers');
const db = require('../database/db');

rutas.get('/usuarios', (req, res) => {
    let mensaje = req.flash('msg');
    let tipo = req.flash('tipo')
    db.query('SELECT u.id, u.nombre, u.usuario, u.activo, r.rol FROM usuarios u INNER JOIN roles r ON u.rol_id = r.idroles', (err, result) =>{
        res.render('listaUsers', {listado: result, mensaje: mensaje, tipo: tipo});
    });
});

rutas.get('/registro', (req, res) => {
    db.query('SELECT * FROM roles', (err, result) =>{
        if(result.length !== 0){
            res.render('addUser', {roles: result });
        }
    });
});

rutas.post('/registro', async (req, res) => {
    const { nombre, correo, clave, rol_id } = req.body;
    let nuevo = {
        nombre: nombre,
        usuario: correo,
        clave: clave,
        rol_id: rol_id
    }
    nuevo.clave = await helpers.encryptPassword(clave);
    db.query('INSERT INTO usuarios SET ?', [nuevo], (err, result) =>{
        if(err){
            req.flash('tipo', 'danger');
            req.flash('msg', 'Algo ocurrió, usuario NO creado!');
            res.redirect('/usuarios');
        }else{
            req.flash('tipo','success');
            req.flash('msg', 'Usuario creado con éxito');
            res.redirect('/usuarios');
        }
    });
});

rutas.post('/editaUsuario', (req, res) => {
    const { id } = req.body;
    let roles = [];
    db.query('SELECT * FROM roles', (err, lista) =>{
        roles = lista;
    });
    db.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, result) =>{
        res.render('editaUser', {user: result[0], roles: roles});
    });
});

rutas.post('/editar', (req, res) => {
    const { id } = req.body;
    const { nombre, correo, rol_id, activo } = req.body;
    let nuevo = {
        nombre: nombre,
        usuario: correo,
        rol_id: rol_id,
        activo: activo
    }
    db.query('UPDATE usuarios SET ? WHERE id = ?', [nuevo, id], (err, result) =>{
        if(err){
            req.flash('tipo', 'danger');
            req.flash('msg', 'Algo ocurrió, usuario NO actualizado!');
            res.redirect('/usuarios');
        }else{
            req.flash('tipo', 'success');
            req.flash('msg', 'Usuario actualizado con éxito');
            res.redirect('/usuarios');
        }
    });
});

rutas.get('/elimina/:id', (req, res) => {
    const {id}  = req.params;
    console.log('ID -> ', id);
    db.query('UPDATE usuarios SET activo = 0 WHERE id = ?', [id], (err, result) => {
        if(err) {
            req.flash('tipo', 'danger');
            req.flash('msg', 'Algo ocurrió, usuario NO pudo ser eliminado!');
            res.redirect('/usuarios');
        }else{
            req.flash('tipo', 'success');
            req.flash('msg', 'Usuario eliminado con éxito');
            res.redirect('/usuarios');
        }
    });
});

module.exports = rutas;