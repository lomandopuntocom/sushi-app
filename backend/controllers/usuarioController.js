const prisma = require('../prisma/client');

const registrarUsuario = async (req, res) => {
  try {
    const { nombre, telefono, email, contrasena, direccion } = req.body;

    const nuevoUsuario = await prisma.usuario.create({
      data: { nombre, telefono, email, contrasena, direccion }
    });

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ error: 'Error al registrar usuario', detalle: error.message });
  }
};

const obtenerUsuarios = async (req, res) => {
  const usuarios = await prisma.usuario.findMany();
  res.json(usuarios);
};

const obtenerUsuarioPorId = async (req, res) => {
  const { id } = req.params;
  const usuario = await prisma.usuario.findUnique({ where: { id: Number(id) } });

  if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

  res.json(usuario);
};

const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, telefono, email, direccion } = req.body;

  try {
    const usuario = await prisma.usuario.update({
      where: { id: Number(id) },
      data: { nombre, telefono, email, direccion }
    });

    res.json(usuario);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar usuario', detalle: error.message });
  }
};

const eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.usuario.delete({ where: { id: Number(id) } });
    res.json({ mensaje: 'Usuario eliminado' });
  } catch (error) {
    res.status(400).json({ error: 'Error al eliminar usuario', detalle: error.message });
  }
};

module.exports = {
  registrarUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario
};
