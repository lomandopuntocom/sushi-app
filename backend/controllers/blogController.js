const {
  publicaciones,
  createPost: createBlogPost,
  savePost: saveBlogPost,
  getSavedPostsForUser
} = require('../mockdata/blogData');

const getPosts = async (req, res) => {
  try {
    res.json({ publicaciones });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

<<<<<<< HEAD
const savePost = async (req, res) => {
  try {
    const { idusuario, idpublicacion } = req.body;

    if (!idusuario || !idpublicacion) {
      return res.status(400).json({ error: 'idusuario and idpublicacion are required' });
    }

    const guardado = saveBlogPost({ idusuario, idpublicacion });
    res.json(guardado);
  } catch (error) {
    console.error('Error saving post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getSavedPosts = async (req, res) => {
  try {
    const { idusuario } = req.params;
    if (!idusuario) {
      return res.status(400).json({ error: 'idusuario is required' });
    }

    const publicacionesGuardadas = getSavedPostsForUser(idusuario);
    res.json(publicacionesGuardadas);
  } catch (error) {
    console.error('Error fetching saved posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

=======
>>>>>>> parent of 2910879 (implementacion inicio de sesion y CRUD de blogs)
const createPost = async (req, res) => {
  try {
    const { idusuario, nombre, autor, contenido, fecha } = req.body;

    if (!nombre || !autor || !contenido) {
      return res.status(400).json({ error: 'nombre, autor and contenido are required' });
    }

    const publicacion = createBlogPost({ idusuario, nombre, autor, contenido, fecha });
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