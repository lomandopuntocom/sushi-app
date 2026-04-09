export const menuService = {
    getMenu: async () => {
        const response = await fetch('http://localhost:3000/api/menu');
        if (!response.ok) {
            throw new Error('Error fetching menu data');
        }
        const data = await response.json();
        return data;
    }
};

export default menuService;
