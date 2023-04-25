const express = require("express"); 
const rutas = express.Router();
const axios = require('axios');
const db = require('../database/db');

rutas.get('/usuarios', async (req, res) => {
    let mensaje = req.flash('msg');
    let tipo = req.flash('tipo');
    try {
        const usuarios = await axios.get("http://localhost:5000/api/v1/usuarios");
        if(usuarios.err){
            console.log(usuarios.err)
        }else{
            res.render('listaUsers', { listado: usuarios.data, mensaje: mensaje, tipo: tipo });
        }
    }catch(err){
        console.log(err)
    }

});

rutas.get('/registro', async (req, res) => {
    try {
        const roles = await axios.get("http://localhost:5000/api/v1/registro");
        if(roles.err){
            console.log(roles.err)
        }else{
            res.render('addUser', {roles: roles.data });
        }

    } catch (error) {
        console.log(error)
    }
});

rutas.post('/registro', (req, res) => {
    const { nombre, correo, clave, rol_id } = req.body;
    const nuevo = {
                nombre: nombre,
                correo: correo,
                clave: clave,
                rol_id: rol_id
            }
    try {
        axios.post('http://localhost:5000/api/v1/registro', nuevo)
            .then(function (response) {
                let mensaje = response.data.msg;
                let tipo = response.data.tipo;
                axios.get("http://localhost:5000/api/v1/usuarios")
                    .then((respuesta) => {
                    let usuarios = respuesta.data;
                    res.render('listaUsers', { listado: usuarios, mensaje: mensaje, tipo: tipo });
                })
            })
            .catch(function (error) {
                console.log('Mal ', error);
            });
    }catch(err){
        console.log(err)
    }
    
});

rutas.post('/editaUsuario', async (req, res) => {
    const { id } = req.body;
    let roles = await axios.get("http://localhost:5000/api/v1/registro");
    let usuario = await axios.post("http://localhost:5000/api/v1/editaUsuario", { id: id });
    if (!usuario.err) {
        res.render('editaUser', {user: usuario.data, roles: roles.data});
    };
});

rutas.post('/editar', (req, res) => {
    const { id } = req.body;
    const { nombre, correo, rol_id, activo } = req.body;
    let nuevo = {
        id: id,
        nombre: nombre,
        correo: correo,
        rol_id: rol_id,
        activo: activo
    }
    try {
        axios.post('http://localhost:5000/api/v1/editar', nuevo)
            .then(function (response) {
                let mensaje = response.data.msg;
                let tipo = response.data.tipo;
                axios.get("http://localhost:5000/api/v1/usuarios")
                    .then((respuesta) => {
                    let usuarios = respuesta.data;
                    res.render('listaUsers', { listado: usuarios, mensaje: mensaje, tipo: tipo });
                })
            })
            .catch(function (error) {
                console.log('Mal ', error);
            });
    }catch(err){
        console.log(err)
    }
});

rutas.get('/elimina/:id', (req, res) => {
    const { id } = req.params;
    try {
        axios.put('http://localhost:5000/api/v1/elimina/'+id)
            .then((respuesta) => {
                if (!respuesta.err) {
                    req.flash('tipo', 'success');
                    req.flash('msg', 'Usuario eliminado con éxito!');
                    res.redirect('/usuarios');
                }else{
                    console.log(respuesta.err);
                }
            })
    } catch (error) {
        console.log(error)
    }
    
});

module.exports = rutas;