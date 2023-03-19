const express = require("express");
const morgan  = require("morgan");
const path    = require("path");
const { nextTick } = require('process');
const ejs = require('ejs');
const dotenv = require('dotenv');
const sesion = require ('express-session');
const bcrypt = require('bcryptjs');
const helpers = require('./libs/helpers');

// Inicializando
const app = express();

// Configuración
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
dotenv.config({path: './.env'});

// Publico
app.use(express.static(path.join(__dirname, 'public')));

// Motor de plantilla
app.set("view engine", "ejs");
app.set("views", path.join(__dirname , "/views"));

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(sesion({
    secret: 'miSecreto',
    resave: false,
    saveUninitialized: false
}));


const db = require('./database/db');

// Rutas
//app.use(require('./routes'));
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/nosotros", (req, res) => {
    res.render("nosotros");
});

app.get("/servicios", (req, res) => {
    res.render("servicios");
});

app.get("/galeria", (req, res) => {
    res.render("galeria");
});

app.get("/contacto", (req, res) => {
    res.render("contacto");
});
  
app.get("/politicas", (req, res) => {
    res.render("politicas");
});
  
app.get("/login", (req, res) => {
    res.render("login");
});


app.post("/auth", async (req, res) => {
    const { usuario, clave } = req.body;
    if (usuario && clave) {
        db.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario], (err, result) =>{
            if(result.length == 0 || !(bcrypt.compareSync(clave, result[0].clave))){
                res.send('Usuario o Password incorrecto')
            }else{
                res.render('negocio');
            }
        });
    }
});

app.get("/olvido", (req, res) => {
    res.render("olvido");
});

app.get("/recuperar", (req, res) => {
    res.render("recuperar");
});

app.get("/negocio", (req, res) => {
    res.render("negocio");
});

app.get("/usuarios", async (req, res) => {
    let tipo = 'success';
    let mensaje = 'Es una prueba';
    const usuarios = await db.query('SELECT u.id, u.nombre, u.usuario, u.activo, r.rol FROM usuarios u INNER JOIN roles r ON u.rol_id = r.id');
    res.render("usuario", {usuarios: usuarios, tipo: tipo, mensaje: mensaje});
});

app.get('/registro', async (req, res)=>{
    const roles = await db.query('SELECT * FROM roles');
    res.render('registro', {roles: roles});
});

app.post("/registro", async (req, res) => {
    const { nombre, correo, clave, rol_id } = req.body;
    let tipo = ''
    let mensaje = ''
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
        tipo = 'success';
        mensaje = 'Usuario añadido exitosamente!'
    } catch (error) {
        tipo = 'danger';
        mensaje = 'Error añadiendo al usuario!'
       console.log('Error');
    }
    res.redirect('/usuarios');
});

// Arrancando Servidor
app.listen(app.get('port'), () => {
    console.log('Corriendo Servidor en puerto : ',app.get('port'));
});