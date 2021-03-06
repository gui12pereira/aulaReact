
const baseQuery = require('./baseQuery')

class Usuario{

    insere(usuario){
        return baseQuery('INSERT INTO usuarios SET ?', usuario)
    }

    buscaPorEmail(email){
        return baseQuery("SELECT * FROM usuarios WHERE email = ? ", email)
    }    
}

module.exports = Usuario