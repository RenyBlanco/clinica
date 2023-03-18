const express = require("express");
const morgan  = require("morgan");
const path    = require("path");
const { nextTick } = require('process');
const ejs = require('ejs');


// Inicializando
const app = express();

// Configuración
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));

// Publico
app.use(express.static(path.join(__dirname, 'public')));

// Motor de plantilla
app.set("view engine", "ejs");
app.set("views", path.join(__dirname , "/views"));

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


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

app.get("/olvido", (req, res) => {
    res.render("olvido");
});
app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/recuperar", (req, res) => {
    res.render("recuperar");
});

app.get("/negocio", (req, res) => {
    res.render("negocio");
});

// Arrancando Servidor
app.listen(app.get('port'), () => {
    console.log('Corriendo Servidor en puerto : ',app.get('port'));
});