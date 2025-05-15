const express = require('express')
const router = express.Router()
const verificarToken = require('../middlewares/authMiddleware')
const { crearCita, listarCitas, actualizarCita, eliminarCita } = require('../controllers/citas.controller')

router.post('/', verificarToken, crearCita)
router.get('/', verificarToken, listarCitas)
router.put('/:id', verificarToken, actualizarCita)
router.delete('/:id', verificarToken, eliminarCita)

module.exports = router