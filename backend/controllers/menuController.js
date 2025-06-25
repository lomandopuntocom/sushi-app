const prisma = require('../prisma/client');

const getMenu = async (req, res) => {
  try {
    const categorias = await prisma.categoria.findMany({
      //include: {
        //platillo: true
     // }
    });
let platillos = await prisma.platillo.findMany()

platillos = platillos.map(plato => ({
  ...plato,
  precio: parseFloat(plato.precio) 
}));
    res.json({ categorias,platillos });
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getMenu
};