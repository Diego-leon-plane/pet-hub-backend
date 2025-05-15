const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const knex = require('../config/knex')

const registrarUsuario = async (req, res) => {
    const { nombre, email, password, rol } = req.body

    try{
        const existe = await knex('usuarios').where({ email }).first()
        if(existe){
            return res.status(400).json({ message: 'El correo ya esta registrado'})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        await knex('usuarios').insert({ nombre, email, password: hashedPassword, rol: rol || 'USER'})

        res.status(201).json({ message: 'Usuario registrado correctamente'})
    }catch(error){
        res.status(500).json({ message: 'Error al registrar usuario', error})
    }

}

const loginUsuario = async (req, res) =>{
    const { email, password } = req.body

    try{
        const usuario = await knex('usuarios').where({ email }).first()
        if(!usuario) return res.status(400).json({ message: 'Credenciales invalidas'})

        const passwordValida = await bcrypt.compare(password, usuario.password)
        if(!passwordValida) return res.status(400).json({ message: 'Credenciales invalidas'})

        const token = jwt.sign(
            {id: usuario.id, rol: usuario.rol},
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        res.json({ message: 'Inicio de sesion con exito', token, rol: usuario.rol })
    }catch(error){
        console.log('Error al iniciar sesion: ', error)
        res.status(500).json({ message: 'Error al iniciar sesión', error: error.message})
    }
}

module.exports = { registrarUsuario, loginUsuario }
