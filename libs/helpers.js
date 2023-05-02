const bcrypt = require('bcryptjs');
const { promisify } = require('util');

const helpers = {};

helpers.encryptPassword = async (pass) => {
    const salt = await bcrypt.genSalt(10);
    const cifrada = await bcrypt.hash(pass, salt);
    return cifrada;
};

helpers.matchPassword = async (pass, clave) => {
    try {
        const salt = await bcrypt.genSaltSync(10);
        const cifrada = await bcrypt.hashSync(pass, salt);
        const valor = await bcrypt.compareSync(cifrada, clave);
        console.log('Sin error');
        return valor;
    } catch (error) {
        console.error(error);
    }
};

helpers.autenticado = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            const verificacion = await promisify(jwt.verify)(req.cookies.jwt, process.env.LLAVE_JWT);
            db.query('SELECT * FROM usuarios WHERE id = ?', [verificacion], async (err, result) => { 
                if (!results) { return next() }
                req.user = result[0];
                return next();
            });
        } catch (error) {
            console.log(error);
            return next();
        }
    } else {
        res.redirect('/');
    }
}

module.exports = helpers;