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

rutas.post('/permisos', async (req, res) => {
    const { id } = req.body;
    let rol = [];
    let modulos = [];
    let permisos = [];
    try {
        const resp = await axios.get("http://localhost:5000/api/v1/rol/"+id);
        if(resp.err){
            console.log(resp.err)
        } else {
            rol = resp.data[0];
        }
        const resp1 = await axios.get("http://localhost:5000/api/v1/modulos");
        if(resp1.err){
            console.log(resp1.err)
        }else{
            modulos = resp1.data;
        }
        const resp2 = await axios.get("http://localhost:5000/api/v1/permisos/"+id);
        if(resp2.err){
            console.log(resp2.err)
        } else {
            permisos = resp2.data;
            if(permisos.length == 0){
                for (let index = 0; index < modulos.length; index++) {
                    let registro = {
                        rol_id: id,
                        ins : "",
                        vw : "",
                        updt : "",
                        dlt : ""
                    };
                    permisos.push(registro);
                }
                res.render('permisos', {permisos: permisos, rol: rol, modulos: modulos});
            }else{
                res.render('permisos', {permisos: permisos, rol: rol, modulos: modulos});
            }
        }
    }catch(err){
        console.log(err)
    }
    
        
});

rutas.post('/guardarPermisos', (req, res) => {
    const { rol_id, modulo_id } = req.body;
  
    db.query('DELETE FROM permisos WHERE rol_id = ?', [rol_id], (err, result) =>{
    if(err){
        req.flash('tipo', 'danger');
        req.flash('msg', 'Algo ocurrió, los permisos NO pudieron ser guardados!');
        res.redirect('/roles');
    }else{
        for (let index = 0; index < modulo_id.length; index++) {
            let error = false;
            let registro = {
                rol_id : rol_id,
                modulo_id : modulo_id[index],
                ver : (ver[index] == 'undefined') ? 0 : 1,
                insertar : (insertar[index] == 'undefined') ? 0 : 1,
                modificar : (modificar[index] == 'undefined') ? 0 : 1,
                borrar : (borrar[index] == 'undefined') ? 0 : 1,
            }
                
            db.query('INSERT INTO permisos SET ?',[registro], (err, resultado)=>{
                if(err){
                    error = true;
                }
            });
            if (error) {
                break;
            }
            if(error){
                req.flash('tipo', 'danger');
                req.flash('msg', 'Algo ocurrió, los permisos NO pudieron ser actualizados!');
                res.redirect('/roles');
            }
        }
        req.flash('tipo', 'success');
        req.flash('msg', 'Los permisos se han actualizado!');
        res.redirect('/roles');
    }
    });
})

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