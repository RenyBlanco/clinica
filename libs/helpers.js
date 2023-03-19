const bcrypt = require('bcryptjs');

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

module.exports = helpers;