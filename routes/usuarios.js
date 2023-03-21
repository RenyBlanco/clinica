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
            res.render('registro', {roles: result });
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

rutas.get('/delete/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM usuarios WHERE id = ?', [id]);
    req.flash('exito', 'Enlace borrado con éxito');
    res.redirect('/usuarios');
});

rutas.get('/editar/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    res.render('editar', {link: link[0]});
});

rutas.post('/editar/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, url, descrip } = req.body;
    const updated = {
        titulo,
        url,
        descrip
    };
    db.query('UPDATE usuarios SET ? WHERE id = ?', [updated, id]);
    req.flash('exito', 'Enlace actualizado con éxito');
    res.redirect('/usuarios');
});
module.exports = rutas;