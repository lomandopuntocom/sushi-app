export const authService = {
    login: async (email, contrasena) => {
        if (!contrasena || !email) {
            throw new Error('Email and password are required');
        }

        try {
            const response = await fetch('http://localhost:3000/api/session/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ contrasena, email })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            return await response.json();
        } catch (error) {
            throw error;
        }
    },

    checkIfUserExist: () => {
        const user = localStorage.getItem('UCBuser');
        if (user) {
            return JSON.parse(user);
        }
        return null;
    },

    logout: () => {
        localStorage.removeItem('UCBuser');
        window.location.href = '/';
    },

    register: async (email, contrasena, nombre, telefono, direccion) => {
        if (!contrasena || !email) {
            throw new Error('Email and password are required');
        }

        try {
            const response = await fetch('http://localhost:3000/api/session/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ contrasena, email, nombre, telefono, direccion })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }

            return await response.json();
        } catch (error) {
            throw error;
        }
    }
};

export default authService;