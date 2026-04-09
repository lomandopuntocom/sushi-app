export const authService = {
    login: async (email, contrasena) => {
        if (!contrasena || !email) {
            throw new Error('Email and password are required');
        }

        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, contrasena })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Invalid credentials');
        }

        const result = await response.json();
        const userToStore = result.user;
        localStorage.setItem('UCBuser', JSON.stringify(userToStore));
        return {
            message: 'Login successful',
            user: userToStore
        };
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

        const response = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, contrasena, nombre, telefono, direccion })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Unable to register');
        }

        const result = await response.json();
        const userToStore = result.user;
        localStorage.setItem('UCBuser', JSON.stringify(userToStore));
        return {
            message: 'User registered successfully',
            user: userToStore
        };
    }
};

export default authService;