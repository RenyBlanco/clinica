const express = require("express");
const morgan  = require("morgan");
const path    = require("path");
const { nextTick } = require('process');
const dotenv = require('dotenv');
const sesion = require ('express-session');
const bcrypt = require('bcryptjs');
const sesionMysql = require('express-mysql-session')(sesion);
const flash = require('connect-flash');


const { database } = require('./keys');

// Inicializando
const app = express();

// Configuración
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
dotenv.config({path: './.env'});

// Ruta Public
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
    saveUninitialized: false,
    store: new sesionMysql(database)
}));
app.use(flash());

// Variables globales
app.use((req, res, next)=>{
    app.locals.mensaje = req.flash('mensaje');
    app.locals.tipo = req.flash('tipo');
    app.locals.usuario = req.usuario;
    next();
});

// Rutas
app.use(require('./routes'));
app.use(require('./routes/autenticacion'));
app.use('/usuarios', require('./routes/usuarios'));

// Arrancando Servidor
app.listen(app.get('port'), () => {
    console.log('Corriendo Servidor en puerto : ',app.get('port'));
});