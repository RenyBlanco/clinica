const express = require("express");
const rutas = express.Router();
const axios = require('axios');

rutas.get('/roles', async (req, res) => {
    let mensaje = req.flash('msg');
    let tipo = req.flash('tipo')
    try {
        const roles = await axios.get("http://localhost:5000/api/v1/roles");
        if(roles.err){
            console.log(roles.err)
        }else{
            res.render('listaRoles', {roles: roles.data, mensaje: mensaje, tipo: tipo});
        }
    }catch(err){
        console.log(err)
    }
});

rutas.post('/addRoles', async (req, res) => {
    const { rol, estado } = req.body;
    let nuevo = {
        rol: rol,
        estado: estado
    }
    try {
        axios.post('http://localhost:5000/api/v1/addRol', nuevo)
            .then(function (response) {
                let mensaje = response.data.msg;
                let tipo = response.data.tipo;
                axios.get("http://localhost:5000/api/v1/roles")
                    .then((respuesta) => {
                    let roles = respuesta.data;
                    res.render('listaRoles', { roles: roles, mensaje: mensaje, tipo: tipo });
                })
            })
            .catch(function (error) {
                console.log('Mal ', error);
            });
    }catch(err){
        console.log(err)
    }
});

// rutas.post('/permisos', (req, res) => {
//     const { id } = req.body;
//     let rol = [];
//     let modulos = [];
//     let permisos = [];
//     db.query('SELECT * FROM roles WHERE idroles = ?', [id], (err, result) =>{
//         rol = result[0];
//     });
//     db.query('SELECT * FROM modulos', (err, result) => {
//         modulos = result;
//     });
//     db.query('SELECT * FROM permisos p WHERE p.rol_id = ?', [id], (err, result) => {
//         if(result.length == 0){
//             for (let index = 0; index < modulos.length; index++) {
//                 let registro = {
//                     rold_id: id,
//                     insertar : "",
//                     ver : "",
//                     modificar : "",
//                     borrar : ""
//                 };
//                 permisos.push(registro);
//             }
//             res.render('permisos', {permisos: permisos, rol: rol, modulos: modulos});
//         }else{
//             res.render('permisos', {permisos: result, rol: rol, modulos: modulos});
//         }
//     });
    
// });

// rutas.post('/guardarPermisos', (req, res) => {
//     const { rol_id, modulo_id } = req.body;
//     console.log('Mod ->', modulo_id);
    
//     res.send('Valor')
//     // db.query('DELETE FROM permisos WHERE rol_id = ?', [rol_id], (err, result) =>{
//     //     if(err){
//     //         req.flash('tipo', 'danger');
//     //         req.flash('msg', 'Algo ocurrió, los permisos NO pudieron ser guardados!');
//     //         res.redirect('/roles');
//     //     }else{
//     //         for (let index = 0; index < modulo_id.length; index++) {
//     //             let error = false;
//     //             let registro = {
//     //                 rol_id : rol_id,
//     //                 modulo_id : modulo_id[index],
//     //                 ver : (ver[index] == 'undefined') ? 0 : 1,
//     //                 insertar : (insertar[index] == 'undefined') ? 0 : 1,
//     //                 modificar : (modificar[index] == 'undefined') ? 0 : 1,
//     //                 borrar : (borrar[index] == 'undefined') ? 0 : 1,
//     //             }
                
//     //             db.query('INSERT INTO permisos SET ?',[registro], (err, resultado)=>{
//     //                 if(err){
//     //                     error = true;
//     //                 }
//     //             });
//     //             if (error) {
//     //                 break;
//     //             }
//     //             if(error){
//     //                 req.flash('tipo', 'danger');
//     //                 req.flash('msg', 'Algo ocurrió, los permisos NO pudieron ser actualizados!');
//     //                 res.redirect('/roles');
//     //             }
//     //         }
//     //         req.flash('tipo', 'success');
//     //         req.flash('msg', 'Los permisos se han actualizado!');
//     //         res.redirect('/roles');
//     //     }
//     // });
// })

rutas.post('/editarRol', (req, res) => {
    const { idroles, rol, estado } = req.body;
    let nuevo = {
        idroles: idroles,
        rol: rol,
        estado: estado
    }
    try {
        axios.post('http://localhost:5000/api/v1/editarRol', nuevo)
            .then(function (response) {
                let mensaje = response.data.msg;
                let tipo = response.data.tipo;
                axios.get("http://localhost:5000/api/v1/roles")
                    .then((respuesta) => {
                    let roles = respuesta.data;
                    res.render('listaRoles', { roles: roles, mensaje: mensaje, tipo: tipo });
                })
            })
            .catch(function (error) {
                console.log('Mal ', error);
            });
    }catch(err){
        console.log(err)
    }
});

rutas.get('/eliminaRol/:id', (req, res) => {
    const { id } = req.params;
    try {
        axios.put('http://localhost:5000/api/v1/eliminaRol/'+id)
            .then((respuesta) => {
                if (!respuesta.err) {
                    req.flash('tipo', 'success');
                    req.flash('msg', 'Rol eliminado con éxito!');
                    res.redirect('/roles');
                }else{
                    console.log(respuesta.err);
                }
            })
    } catch (error) {
        console.log(error)
    }
});

module.exports = rutas;