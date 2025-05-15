const db = require('../config/knex')

const crearMascota = async (req, res) => {
    const { nombre, tipo } = req.body
    const usuarioId = req.usuario.id
    const rol = req.usuario.rol

    //VALIDACION DE ROL
    if(rol !== 'USER'){
        return res.status(403).json({ message: 'Solo los uruarios pueden registrar mascotas'})
    }

    try{
        await db('mascotas').insert({ nombre, tipo, usuario_id: usuarioId})
        res.status(201).json({ message: 'Mascota registrada correctamente '})
    }catch(error){
        res.status(500).json({ message: 'Error al registrar mascota ', error: error.message})
    }
} 

const listarMascota = async (req, res) => {
    const usuarioId = req.usuario.id
    const rol = req.usuario.rol

    try{
        let mascotas
        if(rol === 'ADMIN'){
            mascotas = await db('mascotas').join('usuarios', 'mascotas.usuario_id', 'usuarios.id').select('mascotas.id',
                'mascotas.nombre', 'mascotas.tipo', 'usuarios.nombre as nombrePropietario', 'usuarios.email as emailPropietario')
        }else{
            mascotas = await db('mascotas').where({ usuario_id: usuarioId}).select('*')
        }

        res.json(mascotas)
    }catch(error){
        res.status(500).json({ message: 'Error al listar mascotas', error: error.message})
    }
}

const actualizarMascota = async (req, res) => {
    const { id } = req.params
    const { nombre, tipo } = req.body
    const usuarioId = req.usuario.id
    const rol = req.usuario.rol

    //VALIDACION DE ROL 
    if(rol !== 'USER'){
        return res.status(403).json({ message: 'Solo los usuarios pueden actualizar mascotas'})
    }

    try{
        const mascota = await db('mascotas').where({ id, usuario_id: usuarioId}).first()

        if(!mascota){
            return res.status(404).json({ message: 'Mascota no encontrada o no tienes permisos de USER'})
        }

        await db('mascotas').where({ id }).update({ nombre, tipo })
        res.json({ message: 'Mascota actualizada correctamente'})
    }catch(error){
        res.status(500).json({ message: 'Error al acrualizar mascota', error: error.message})
    }
}

const eliminarMascota = async (req, res) => { 
    const { id } = req.params
    const usuarioId = req.usuario.id
    const rol = req.usuario.rol 

    //VALIDACION DE ROL
    if(rol !== 'USER'){
        return res.status(403).json({ message: 'Solo los usuarios pueden eliminar mascotas'})
    }

    try{
        const mascota = await db('mascotas').where({ id, usuario_id: usuarioId}).first()

        if(!mascota){
            return res.status(404).json({ message: 'Mascota no encontrada o no tienes permisos de USER '})
        }

        await db('mascotas').where({ id }).del()
        res.json({ message: 'Mascota eliminada correctamente'})
    }catch(error){
        res.status(500).json({ message: 'Error al eliminar mascota', error: error.message})
    }
}

module.exports = { crearMascota, listarMascota, actualizarMascota, eliminarMascota}