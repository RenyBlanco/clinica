const express = require("express");
const rutas = express.Router();
const helpers = require('../libs/helpers');
const db = require('../database/db');

rutas.get('/', (req, res) => {
    let lista = db.query('SELECT u.id, u.nombre, u.usuario, u.activo, r.rol FROM usuarios u INNER JOIN roles r ON u.rol_id = r.id');
    // let lista = [
    //     {
    //         nombre : 'Rey',
    //         usuario : 'rey@rey.com',
    //         rol : 'Admin',
    //         activo : 1
    //     },
    //     {
    //         nombre : 'Gaby',
    //         usuario : 'rey@rey.com',
    //         rol : 'Otro',
    //         activo : 1
    //     }
    // ]
    res.render('listaUsers', {listado: lista});
});

rutas.get('/registro', (req, res) => {
    const roles = db.query('SELECT * FROM roles');
    res.render('registro', {roles: roles});
});

rutas.post('/registro', async (req, res) => {
    const { nombre, correo, clave, rol_id } = req.body;
    let nuevo = {
        nombre: nombre,
        usuario: correo,
        clave: clave,
        activo: 1,
        rol_id: rol_id
    }
    try {
        nuevo.clave = await helpers.encryptPassword(clave);
        const result = db.query('INSERT INTO usuarios SET ?', [nuevo]);
        nuevo.id = result.insertId;
        req.flash('tipo', 'success');
        req.flash('mensaje', 'Usuario creado con éxito');
    } catch (error) {
        req.flash('tipo', 'danger');
        req.flash('mensaje', 'Algo ocurrió, usuario NO creado!');
    }
    res.redirect('/usuarios');
});

rutas.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM usuarios WHERE id = ?', [id]);
    req.flash('exito', 'Enlace borrado con éxito');
    res.redirect('/usuarios');
});

rutas.get('/editar/:id', async (req, res) => {
    const { id } = req.params;
    const link = await db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    res.render('usuarios/editar', {link: link[0]});
});

rutas.post('/editar/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, url, descrip } = req.body;
    const updated = {
        titulo,
        url,
        descrip
    };
    await db.query('UPDATE usuarios SET ? WHERE id = ?', [updated, id]);
    req.flash('exito', 'Enlace actualizado con éxito');
    res.redirect('/usuarios');
});
module.exports = rutas;