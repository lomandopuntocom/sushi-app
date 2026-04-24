const { menuData } = require('../mockdata/menuData');

const normalizeCategoryId = (id) => {
  switch (id) {
    case 'all':
      return 1;
    case 'cat2':
      return 2;
    case 'cat3':
      return 3;
    case 'cat4':
      return 4;
    default:
      return typeof id === 'number' ? id : id;
  }
};

const getMenu = async (req, res) => {
  try {
    const categorias = menuData.categorias.map(cat => ({
      id: normalizeCategoryId(cat.id),
      nombre: cat.nombre,
      idcategoria: normalizeCategoryId(cat.id)
    }));

    const platillos = menuData.platillos.map(plato => ({
      id: plato.id,
      nombre: plato.nombre,
      descripcion: plato.descripcion,
      precio: parseFloat(plato.precio),
      image: plato.imagen,
      imagen: plato.imagen,
      idcategoria: normalizeCategoryId(plato.idCategoria)
    }));

    res.json({ categorias, platillos });
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getMenu
};