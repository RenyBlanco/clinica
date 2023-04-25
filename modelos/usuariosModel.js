class Usuario {
    id;
    nombre;
    correo;
    clave;
    id_rol;
    rut;
    constructor(_id, _nom, _cor, _clav, _rol, _rut) {
        this.id = _id;
        this.nombre = _nom;
        this.correo = _cor;
        this.clave = _clav;
        this.rol = _rol;
        this.rut = _rut;
    }
    set pId(id) {
        this.id = id;
    }
    get pId() { 
        return this.id; 
    }

    set pNombre(nombre) {
        this.nombre = nombre;
    }
    get pNombre() {
        return this.nombre;
    }
    set pRut(rut) {
        this.rut = rut;
    }
    get pRut() {
        return this.rut;
    }
    set pClave(clave) {
        this.clave = clave;
    }
    get pClave() {
        return this.clave;
    }
    set pCorreo(correo) {
        this.correo = correo;
    }
    get pCorreo() {
        return this.correo;
    }
    set pRol(rol) {
        this.rol = rol;
    }
    get pRol() {
        return this.rol;
    }
}