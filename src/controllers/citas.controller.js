const db = require('../config/knex');

const formatFecha = (fechaStrifg) => {
    const fecha = new Date(fechaStrifg)
    const offset = fecha.getTimezoneOffset() * 60000
    const localDate = new Date(fecha.getTime() - offset)
    return localDate.toISOString().slice(0, 19).replace('T', ' ')
}

const crearCita = async (req, res) => {
    const { mascota_id, fecha, descripcion } = req.body
    const usuarioId = req.usuario.id;
    const rol = req.usuario.rol

    //VERIFICAION DEL ROL
    if(rol !== 'USER'){
        return res.status(403).json({ message: 'Solo los usuarios pueden crear citas'})
    }

    //Verifica que la mascota sea del usuario que esta creando la cita
    try{
        const mascota = await db('mascotas').where({ id: mascota_id, usuario_id: usuarioId}).first()

        if(!mascota){
            return res.status(403).json({ message: 'No es posible registrar cita para esta mascota ya que no es tuya'})
        }

        await db('citas').insert({ mascota_id, fecha: formatFecha(fecha), descripcion })
        res.status(201).json({ message: 'Cita registrada correctamente'})
    }catch(error){
        res.status(500).json({ message: 'Error al crear cita', error: error.message})
    }
}

const listarCitas = async (req, res) => {
    const usuarioId = req.usuario.id
    const rol = req.usuario.rol

    try{
        let citas 

        if(rol === 'ADMIN') {
            citas = await db('citas').join('mascotas', 'citas.mascota_id', 'mascotas.id')
            .join('usuarios', 'mascotas.usuario_id', 'usuarios.id')
            .select('citas.*', 'mascotas.nombre as nombre_mascota', 'usuarios.nombre as nombre_usuario')
        } else {
            citas = await db('citas')
            .join('mascotas', 'citas.mascota_id', 'mascotas.id')
            .where('mascotas.usuario_id', usuarioId)
            .select('citas.*', 'mascotas.nombre as nombre_mascota')
        }
      
        res.json(citas)
    }catch(error){
        res.status(500).json({ message: 'Error al obtener citas', error: error.message})
    }
}


const actualizarCita = async (req, res) =>{
    const { id } = req.params 
    const { fecha, descripcion, mascota_id } = req.body
    const usuarioId = req.usuario.id
    const rol = req.usuario.rol

    //VERIFICACION DE ROL
    if(rol !== 'ADMIN'){
        return res.status(403).json({ message: 'No tienes permiso para editar esta cita'})
    }

    try{
        const cita = await db('citas').where({ id }).first()

        if(!cita){
            return res.status(404).json({ message: 'Cita no encontrada'})
        }

        await db('citas').where({ id }).update({ fecha: formatFecha(fecha), descripcion, mascota_id })
        res.json({ message: 'Cita actualizada correctamente'})
    }catch(error){
        res.status(500).json({ message: 'Error al actualizar cita', error: error.message})
    }
}

const eliminarCita = async (req, res) => {
    const { id } = req.params
    const rol= req.usuario.rol

    //VERIFICACION DEL ROL 
    if(rol !== 'ADMIN'){
        return res.status(403).json({ message: 'No tienes permisos para eliminar esta cita'})
    }

    try{
        const cita = await db('citas').where({ id }).first()

        if(!cita){
            return res.status(404).json({ message: 'Cita no encontrada'})
        }

        await db('citas').where({ id }).del()
        res.json({ message: 'Cita eliminada correctamente'})
    }catch(error){
        res.status(500).json({ message: 'Error al eliminar cita', error: error.message})
    }
}

module.exports = {crearCita, listarCitas, actualizarCita, eliminarCita}