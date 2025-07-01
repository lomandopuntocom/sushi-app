const prisma = require('../prisma/client')

const createReservation = async (req, res) => {
    try {
        const { idusuario, nombre, telefono, email, invitados, fecha, tiempo } = req.body;
        const reservation = await prisma.reservacion.create({
            data: { nombre, telefono, email, invitados, fecha, tiempo, estado: "Pendiente" }
        });
        res.json(reservation)
    }
    catch (error){ 
        console.error("Error during appointment:", error)
        res.status(500).json({error: 'Internal server error'})
    }
};

const getReservation = async (req, res) => {
    try {
        const reservaciones = await prisma.reservacion.findMany({});
        res.json({ reservaciones });
    }
    catch(error){
        console.error("Error to get reservations", error);
        res.status(500).json({error: 'Internal error server'});
    }
}

module.exports = {
    createReservation,
    getReservation
};