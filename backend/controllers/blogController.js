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

module.exports = {
  getMenu
};