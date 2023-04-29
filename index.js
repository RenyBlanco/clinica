const express = require("express");
const morgan  = require("morgan");
const path    = require("path");
const { nextTick } = require('process');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const sesion = require('express-session');

const flash = require('connect-flash');
const sesionMysql = require('express-mysql-session')(sesion);


const { database } = require('./keys');

// Inicializando
const app = express();

// Configuración
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
dotenv.config({ path: './.env' });
app.use(cookieParser());

// Ruta Public
app.use(express.static(path.join(__dirname, 'public')));

// Motor de plantilla
app.set("view engine", "ejs");

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

// Rutas
app.use(require('./routes'));
app.use(require('./routes/autenticacion'));
app.use(require('./routes/usuarios'));
app.use(require('./routes/roles'));
app.use(require('./routes/modulos'));
app.use(require('./routes/pacientes'));

// Arrancando Servidor
app.listen(app.get('port'), () => {
    console.log('Corriendo Servidor en puerto : ',app.get('port'));
});