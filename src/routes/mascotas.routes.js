const express = require('express')
const router = express.Router()
const verificarToken = require('../middlewares/authMiddleware')
const { crearMascota, listarMascota, actualizarMascota, eliminarMascota } = require('../controllers/mascotas.controller')

router.post('/', verificarToken, crearMascota)
router.get('/', verificarToken, listarMascota)
router.put('/:id', verificarToken, actualizarMascota)
router.delete('/:id', verificarToken, eliminarMascota)

module.exports = router 