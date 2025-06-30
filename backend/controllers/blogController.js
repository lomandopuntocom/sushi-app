const prisma = require('../prisma/client');

const getPosts = async (req, res) => {
  try {
    const publicaciones = await prisma.publicaciones.findMany({});
    res.json({ publicaciones });
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createPost = async (req, res) => {
  try {
    const { idusuario, nombre, autor, contenido } = req.body;
    const publicacion = await prisma.publicaciones.create({
      data: { idusuario, nombre, autor, contenido, fecha: new Date() }
    });
    res.json(publicacion);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getPosts,
  createPost,
};