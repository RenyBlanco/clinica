const express = require("express"); 
const helpers = require('../libs/helpers');
const db = require('../database/db');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.listen(5000, () => {
    console.log('Corriendo Servidor en puerto : 5000');
});

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