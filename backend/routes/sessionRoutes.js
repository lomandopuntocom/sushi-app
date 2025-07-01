const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

router.post('/login', sessionController.login);
router.post('/register', sessionController.registration);

module.exports = router;