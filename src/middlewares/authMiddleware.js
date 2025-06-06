const jwt = require('jsonwebtoken')

const verificarToken = (req, res, next) =>{
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ message: 'Token no proporcionado' })
    }

    const token = authHeader.split(' ')[1]

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.usuario = decoded //Guarda usuario en el request.
        next()
    }catch(error){
        return res.status(401).json({ message: 'Token invalido', error: error.message })
    }
}


module.exports = verificarToken