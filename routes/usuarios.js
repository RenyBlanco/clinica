const express = require("express");
const rutas = express.Router();
const helpers = require('../libs/helpers');
const db = require('../database/db');

rutas.get('/usuarios', (req, res) => {
    db.query('SELECT u.id, u.nombre, u.usuario, u.activo, r.rol FROM usuarios u INNER JOIN roles r ON u.rol_id = r.id', (err, result) =>{
        if(result.length == 0){
            res.send('Error')
        }else{
            res.render('listaUsers', {listado: result});
        }
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
        activo: 1,
        rol_id: rol_id
    }
    try {
        nuevo.clave = await helpers.encryptPassword(clave);
        db.query('INSERT INTO usuarios SET ?', [nuevo], (err, result) =>{
            if(err){
                res.render('regsitro', {
                    roles : [],
                    alert: true,
                    alertTitle: 'Registro',
                    alertIcon: 'error',
                    alertText: 'Algo ocurrió, usuario No creado!'
                });
                console.log('Error en el registro');
            }else{
                res.render('regsitro', {
                    roles : [],
                    alert: true,
                    alertTitle: 'Registro',
                    alertIcon: 'success',
                    alertText: 'Usuario creado con éxito!'
                });
                console.log('Grabó registro');
            }
        });
        req.flash('tipo', 'success');
        req.flash('mensaje', 'Usuario creado con éxito');
    } catch (error) {
        req.flash('tipo', 'danger');
        req.flash('mensaje', 'Algo ocurrió, usuario NO creado!');
    }
    res.redirect('/usuarios');
});

// rutas.post('/registro', async (req, res) => {
//     const { nombre, correo, clave, rol_id } = req.body;
//     let tipo = '';
//     let mensaje = '';
//     let nuevo = {
//         nombre: nombre,
//         usuario: correo,
//         clave: clave,
//         activo: 1,
//         rol_id: rol_id
//     }
//     nuevo.clave = await helpers.encryptPassword(clave);
//     db.query('INSERT INTO usuarios SET ?', [nuevo], (err, result) =>{
//         if(err){
//             // res.render('regsitro', {
//             //     roles : [],
//             //     alert: true,
//             //     alertTitle: 'Registro',
//             //     alertIcon: 'error',
//             //     alertText: 'Algo ocurrió, usuario No creado!'
//             // });
//             console.log('Error en el registro');
//         }else{
//             // res.render('regsitro', {
//             //     roles : [],
//             //     alert: true,
//             //     alertTitle: 'Registro',
//             //     alertIcon: 'success',
//             //     alertText: 'Usuario creado con éxito!'
//             // });
//             console.log('Grabó registro');
//         }
//     });
//     res.redirect('/usuarios');
// });

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