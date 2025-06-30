const express = require('express');
const router = express.Router();
const { createReservation, getUserReservations } = require('../controllers/reservationController');

router.post('/create', createReservation);
router.get('/user/:id', getUserReservations);

module.exports = router;