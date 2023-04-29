const express = require("express"); 
const rutas = express.Router();
const axios = require('axios');

rutas.get('/pacientes', async (req, res) => {
    let mensaje = req.flash('msg');
    let tipo = req.flash('tipo');
    try {
        const pacientes = await axios.get("http://localhost:5000/api/v1/pacientes");
        if(pacientes.err){
            console.log(pacientes.err)
        }else{
            res.render('listaPacientes', { listado: pacientes.data, mensaje: mensaje, tipo: tipo });
        }
    }catch(err){
        console.log(err)
    }
});

rutas.get('/addPaciente', (req, res) => {
   res.render('addPaciente');
});

rutas.post('/addPaciente', (req, res) => {
    const { nombre, correo, telefono, rut, direccion } = req.body;
    const nuevo = {
                nombre: nombre,
                correo: correo,
                telefono: telefono,
                rut: rut,
                direccion: direccion
            }
    try {
        axios.post('http://localhost:5000/api/v1/addPaciente', nuevo)
            .then(function (response) {
                let mensaje = response.data.msg;
                let tipo = response.data.tipo;
                axios.get("http://localhost:5000/api/v1/pacientes")
                    .then((respuesta) => {
                    let pacientes = respuesta.data;
                    res.render('listaPacientes', { listado: pacientes, mensaje: mensaje, tipo: tipo });
                })
            })
            .catch(function (error) {
                console.log('Mal ', error);
            });
    }catch(err){
        console.log(err)
    }
    
});

rutas.post('/editPac', async (req, res) => {
    const { id } = req.body;
    let paciente = await axios.post("http://localhost:5000/api/v1/editPac", { id: id });
    if (!paciente.err) {
        res.render('editaPaciente', { paciente: paciente.data });
    };
});

rutas.post('/editarPaciente', (req, res) => {
    const { id } = req.body;
    const { nombre, correo, telefono, rut, direccion, estado } = req.body;
    let nuevo = {
        id: id,
        nombre: nombre,
        correo: correo,
        telefono: telefono,
        rut: rut,
        direccion: direccion,
        estado: estado
    }
    try {
        axios.post('http://localhost:5000/api/v1/editarPaciente', nuevo)
            .then(function (response) {
                let mensaje = response.data.msg;
                let tipo = response.data.tipo;
                axios.get("http://localhost:5000/api/v1/pacientes")
                    .then((respuesta) => {
                    let pacientes = respuesta.data;
                    res.render('listaPacientes', { listado: pacientes, mensaje: mensaje, tipo: tipo });
                })
            })
            .catch(function (error) {
                console.log('Mal ', error);
            });
    }catch(err){
        console.log(err)
    }
});

rutas.get('/eliminaPaciente/:id', (req, res) => {
    const { id } = req.params;
    try {
        axios.put('http://localhost:5000/api/v1/eliminaPaciente/'+id)
            .then((respuesta) => {
                if (!respuesta.err) {
                    req.flash('tipo', 'success');
                    req.flash('msg', 'Paciente eliminado con éxito!');
                    res.redirect('/pacientes');
                }else{
                    console.log(respuesta.err);
                }
            })
    } catch (error) {
        console.log(error)
    }
});

module.exports = rutas;