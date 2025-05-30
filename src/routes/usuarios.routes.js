const express = require('express');
const router = express.Router();
const { registrarUsuario, loginUsuario } = require('../controllers/usuarios.controller');

router.post('/', registrarUsuario)
router.post('/login', loginUsuario)

module.exports = router;