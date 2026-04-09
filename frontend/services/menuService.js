import { menuData } from '../mockdata/platos.js';

export const menuService = {
    getMenu: async () => {
        // Simulate network delay
        return new Promise((resolve) => {
            setTimeout(() => {
                // Transform the mockdata to match expected format
                const categorias = menuData.categorias.map(cat => ({
                    id: cat.id,
                    nombre: cat.nombre,
                    idcategoria: cat.id
                }));

                // Keep properties as expected by cart: image for display, precio for price
                const platillos = menuData.platillos.map(plato => ({
                    id: plato.id,
                    nombre: plato.nombre,
                    descripcion: plato.descripcion,
                    precio: plato.precio,
                    image: plato.imagen, // For display in menu card
                    imagen: plato.imagen, // For cart compatibility
                    idcategoria: plato.idCategoria
                }));

                resolve({
                    categorias,
                    platillos
                });
            }, 100);
        });
    }
};

export default menuService;
