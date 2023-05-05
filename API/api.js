const express = require("express"); 
const helpers = require('../libs/helpers');
const db = require('../database/db');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.listen(5000, () => {
    console.log('Corriendo Servidor en puerto : 5000');
});

// API PARA CITAS

app.post('/api/v1/guardaCita', (req, res) => { 
    const { nombre, apellido, correo, rut, fecha, hora } = req.body;
    const nuevo = {
        nombre: nombre,
        apellido: apellido,
        rut: rut,
        correo: correo,
        fecha: fecha,
        hora: hora
    }
    db.query('INSERT INTO citas SET ?', [nuevo], (err, result) =>{
        if (err) {
            const respuesta = {
                tipo: "danger",
                msg: "Algo ocurrió, cita NO creada!"
            }
            res.send(respuesta);
        } else {
            const respuesta = {
                tipo: "success",
                msg: "Cita agendada con éxito!, nos comunicaremos en breve"
            }
            res.send(respuesta);
        }
    });
});

// API USUARIOS
app.get('/api/v1/usuarios', (req, res) => {
    db.query('SELECT u.id, u.nombre, u.correo, u.activo, r.rol FROM usuarios u INNER JOIN roles r ON u.rol_id = r.idroles ORDER BY u.nombre', (err, result) =>{
        if (err) {
            res.json({err})
        } else {
            res.send(result);
        }
    });
});

app.get('/api/v1/registro', (req, res) => {
    db.query('SELECT * FROM roles', (err, result) =>{
        if (err) {
            res.json({err})
        } else {
            res.send(result);
        }
    });
});

app.post('/api/v1/registro', (req, res) => {
    const { nombre, correo, clave, rol_id } = req.body;
    let nuevo = {
        nombre: nombre,
        correo: correo,
        clave: clave,
        rol_id: rol_id
    }
    nuevo.clave = helpers.encryptPassword(clave);
    db.query('INSERT INTO usuarios SET ?', [nuevo], (err, result) =>{
        if (err) {
            const respuesta = {
                tipo: "danger",
                msg: "Algo ocurrió, usuario NO creado!"
            }
            res.send(respuesta);
        } else {
            const respuesta = {
                tipo: "success",
                msg: "Usuario creado con éxito!"
            }
            res.send(respuesta);
        }
    });
});

app.post('/api/v1/editaUsuario', (req, res) => {
    const { id } = req.body;
    db.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, result) => {
        res.send(result[0]);
    });
});

app.post('/api/v1/editar', (req, res) => {
    const { id } = req.body;
    const { nombre, correo, rol_id, activo} = req.body;
    let nuevo = {
        nombre: nombre,
        correo: correo,
        rol_id: rol_id,
        activo: activo
    }
    db.query('UPDATE usuarios SET ? WHERE id = ?', [nuevo, id], (err, result) =>{
        if (err) {
            const respuesta = {
                tipo: "danger",
                msg: "Algo ocurrió, usuario NO actualizado!"
            }
            res.send(respuesta);
        } else {
            const respuesta = {
                tipo: "success",
                msg: "Usuario actualizado con éxito!"
            }
            res.send(respuesta);
        }
    });
});

app.put('/api/v1/elimina/:id', (req, res) => {
    const {id}  = req.params;
    db.query('UPDATE usuarios SET activo = 0 WHERE id = ?', [id], (err, result) => {
        if (err) {
            const respuesta = {
                tipo: "danger",
                msg: "Algo ocurrió, usuario NO eliminado!"
            }
            res.send(respuesta);
        } else {
            const respuesta = {
                tipo: "success",
                msg: "Usuario eliminado con éxito!"
            }
            res.send(respuesta);
        }
    });
});

// API ROLES

app.get('/api/v1/roles', (req, res) => {
    db.query('SELECT * FROM roles', (err, result) =>{
        if (err) {
            res.json({err})
        } else {
            res.send(result);
        }
    });
});
app.get('/api/v1/rol/:id', (req, res) => {
    const {id}  = req.params;
    db.query('SELECT * FROM roles WHERE idroles = ?', [id], (err, result) =>{
        if (err) {
            res.json({err})
        } else {
            res.send(result);
        }
    });
});

app.post('/api/v1/addRol', (req, res) => {
    const { rol, estado } = req.body;
    let nuevo = {
        rol: rol,
        estado: estado
    }
    db.query('INSERT INTO roles SET ?', [nuevo], (err, result) =>{
        if(err){
            const respuesta = {
                tipo: "danger",
                msg: "Algo ocurrió, rol NO creado!"
            }
            res.send(respuesta);
        }else{
            const respuesta = {
                tipo: "success",
                msg: "Rol creado con éxito!"
            }
            res.send(respuesta);
        }
    });
});

app.post('/api/v1/editarRol', (req, res) => {
    const { idroles, rol, estado } = req.body;
    let nuevo = {
        rol: rol,
        estado: estado
    }
    db.query('UPDATE roles SET ? WHERE idroles = ?', [nuevo, idroles], (err, result) => {
        if (err) {
          const respuesta = {
                tipo: "danger",
                msg: "Algo ocurrió, rol NO actualizado!"
            }  
            res.send(respuesta);
        } else {
            const respuesta = {
                tipo: "success",
                msg: "Rol actualizado con éxito!"
            }
            res.send(respuesta);
        }
    });
});

app.put('/api/v1/eliminaRol/:id', (req, res) => {
    const {id}  = req.params;
    db.query('UPDATE roles SET estado = 0 WHERE idroles = ?', [id], (err, result) => {
        if (err) {
            const respuesta = {
                tipo: "danger",
                msg: "Algo ocurrió, rol NO eliminado!"
            }
            res.send(respuesta);
        } else {
            const respuesta = {
                tipo: "success",
                msg: "Rol eliminado con éxito!"
            }
            res.send(respuesta);
        }
    });
});


// API PERMISOS

app.get('/api/v1/permisos/:id', (req, res) => {
    const {id} = req.params;
    db.query("SELECT * FROM `permisos` WHERE id_rol = ?", [id], (err, result) => {
        if (err) {
            res.json({err})
        } else {
            res.send(result);
        }
    });
});

     

// API MODULOS
app.get('/api/v1/modulos', (req, res) => {
    db.query('SELECT * FROM modulos', (err, result) =>{
        if (err) {
            res.json({err})
        } else {
            res.send(result);
        }
    });
});

app.post('/api/v1/addModulo', (req, res) => {
    const { modulo, estado } = req.body;
    let nuevo = {
        modulo: modulo,
        estado: estado
    }
    db.query('INSERT INTO modulos SET ?', [nuevo], (err, result) =>{
        if(err){
            const respuesta = {
                tipo: "danger",
                msg: "Algo ocurrió, módulo NO creado!"
            }
            res.send(respuesta);
        }else{
            const respuesta = {
                tipo: "success",
                msg: "Módulo creado con éxito!"
            }
            res.send(respuesta);
        }
    });
});

app.post('/api/v1/editarModulo', (req, res) => {
    const { idmodulos, modulo, estado } = req.body;
    let nuevo = {
        modulo: modulo,
        estado: estado
    }
    db.query('UPDATE modulos SET ? WHERE idmodulos = ?', [nuevo, idmodulos], (err, result) =>{
        if (err) {
          const respuesta = {
                tipo: "danger",
                msg: "Algo ocurrió, módulo NO actualizado!"
            }  
            res.send(respuesta);
        } else {
            const respuesta = {
                tipo: "success",
                msg: "Módulo actualizado con éxito!"
            }
            res.send(respuesta);
        }
    });
});

app.put('/api/v1/eliminaModulo/:id', (req, res) => {
    const {id}  = req.params;
    db.query('UPDATE modulos SET estado = 0 WHERE idmodulos = ?', [id], (err, result) => {
        if (err) {
            const respuesta = {
                tipo: "danger",
                msg: "Algo ocurrió, modulo NO eliminado!"
            }
            res.send(respuesta);
        } else {
            const respuesta = {
                tipo: "success",
                msg: "Modulo eliminado con éxito!"
            }
            res.send(respuesta);
        }
    });
});

// API PACIENTES
app.get('/api/v1/pacientes', (req, res) => {
    db.query('SELECT * FROM pacientes', (err, result) =>{
        if (err) {
            res.json({err})
        } else {
            res.send(result);
        }
    });
});

app.post('/api/v1/addPaciente', (req, res) => {
    const { nombre, correo, telefono, rut, direccion } = req.body;
    const nuevo = {
                nombre: nombre,
                correo: correo,
                telefono: telefono,
                rut: rut,
                direccion: direccion
            }
    db.query('INSERT INTO pacientes SET ?', [nuevo], (err, result) =>{
        if(err){
            const respuesta = {
                tipo: "danger",
                msg: "Algo ocurrió, paciente NO creado!"
            }
            res.send(respuesta);
        }else{
            const respuesta = {
                tipo: "success",
                msg: "Paciente creado con éxito!"
            }
            res.send(respuesta);
        }
    });
});

app.post('/api/v1/editPac', (req, res) => {
    const { id } = req.body;
    db.query('SELECT * FROM pacientes WHERE idpaciente = ?', [id], (err, result) => {
        res.send(result[0]);
    });
});
app.post('/api/v1/editarPaciente', (req, res) => {
    const { id, nombre, correo, telefono, rut, direccion, estado } = req.body;
    const nuevo = {
                nombre: nombre,
                correo: correo,
                telefono: telefono,
                rut: rut,
                direccion: direccion,
                estado: estado
            }
    db.query('UPDATE pacientes SET ? WHERE idpaciente = ?', [nuevo, id], (err, result) =>{
        if (err) {
            console.log('Error -> ', err);
            const respuesta = {
                    tipo: "danger",
                    msg: "Algo ocurrió, paciente NO actualizado!"
                }  
            res.send(respuesta);
        } else {
            const respuesta = {
                tipo: "success",
                msg: "Paciente actualizado con éxito!"
            }
            res.send(respuesta);
        }
    });
});

app.put('/api/v1/eliminaPaciente/:id', (req, res) => {
    const { id }  = req.params;
    db.query('UPDATE pacientes SET estado = 0 WHERE idpaciente = ?', [id], (err, result) => {
        if (err) {
            const respuesta = {
                tipo: "danger",
                msg: "Algo ocurrió, paciente NO eliminado!"
            }
            res.send(respuesta);
        } else {
            const respuesta = {
                tipo: "success",
                msg: "Paciente eliminado con éxito!"
            }
            res.send(respuesta);
        }
    });
});