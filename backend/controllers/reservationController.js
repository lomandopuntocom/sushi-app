const prisma = require("../prisma/client");

const createReservation = async (req, res) => {
    try {
        const { nombre, telefono, email, guests, fecha, hora } = req.body;
        const reservation = await prisma.reservacion.create({
            data: { nombre, telefono, email, guests, fecha, hora }
        });
        res.json({ message: 'Reservation created successfully', reservation });
    } catch (error) {
        console.error('Error creating reservation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getUserReservations = async (req, res) => {
    try {
        const { id } = req.params;
        const reservations = await prisma.reservacion.findMany({
            where: { idusuario: Number(id) }
        });
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
