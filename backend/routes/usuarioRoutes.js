const express = require('express');
const { registrarUsuario } = require('../controllers/usuarioController');
const router = express.router();
router.post('/registro', registrarUsuario);

module.exports = router;