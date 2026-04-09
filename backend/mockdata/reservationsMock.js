const reservations = [];

function createReservation({ nombre, telefono, email, guests, fecha, hora, idusuario }) {
  const newReservation = {
    id: reservations.length ? reservations[reservations.length - 1].id + 1 : 1,
    nombre,
    telefono,
    email,
    guests,
    fecha,
    hora,
    idusuario: idusuario || null
  };
  reservations.push(newReservation);
  return newReservation;
}

function getReservationsForUser(idusuario) {
  return reservations.filter(res => res.idusuario === Number(idusuario));
}

module.exports = {
  createReservation,
  getReservationsForUser
};