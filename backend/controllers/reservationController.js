const { createReservation: createRes, getReservationsForUser } = require('../mockdata/reservationsMock');

const createReservation = async (req, res) => {
    try {
        const { nombre, telefono, email, guests, fecha, hora, idusuario } = req.body;
        const reservation = createRes({ nombre, telefono, email, guests, fecha, hora, idusuario });
        res.json({ message: 'Reservation created successfully', reservation });
    } catch (error) {
        console.error('Error creating reservation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getUserReservations = async (req, res) => {
    try {
        const { id } = req.params;
        const reservations = getReservationsForUser(id);
        res.json({ reservations });
    } catch (error) {
        console.error('Error fetching reservations:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createReservation,
    getUserReservations
};
