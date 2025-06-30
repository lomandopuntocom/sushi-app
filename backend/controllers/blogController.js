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

getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const publicacion = await prisma.publicaciones.findUnique({ where: { id: Number(id) } });
    res.json(publicacion);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

savePost = async (req, res) => {
  try {
    const { idusuario, idpublicacion } = req.body;
    // Crea un registro en la tabla guardado, si no existe
    const guardado = await prisma.guardado.upsert({
      where: {
        idpublicacion_idusuario: {
          idpublicacion: Number(idpublicacion),
          idusuario: Number(idusuario)
        }
      },
      update: {}, // No actualiza nada si ya existe
      create: {
        idpublicacion: Number(idpublicacion),
        idusuario: Number(idusuario)
      }
    });
    res.json(guardado);
  } catch (error) {
    console.error('Error saving post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Obtener publicaciones guardadas de un usuario
getSavedPosts = async (req, res) => {
  try {
    const { idusuario } = req.params;
    const guardados = await prisma.guardado.findMany({
      where: { idusuario: Number(idusuario) },
      include: { publicaciones: true }
    });
    // Solo devolver los datos de la publicación
    const publicaciones = guardados.map(g => g.publicaciones).filter(Boolean);
    res.json(publicaciones);
  } catch (error) {
    console.error('Error fetching saved posts:', error);
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
  savePost,
  getSavedPosts
};