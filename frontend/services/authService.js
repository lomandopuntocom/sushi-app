import { findUserByEmail, addUser, getAllUsers, initializeMockUsers } from '../mockdata/mockUsers.js';

export const authService = {
    login: async (email, contrasena) => {
        if (!contrasena || !email) {
            throw new Error('Email and password are required');
        }

        try {
            // Initialize mock users on first login
            initializeMockUsers();

            // Find user in mock data
            const user = findUserByEmail(email);

            if (!user) {
                throw new Error('Invalid credentials');
            }

            if (user.contrasena !== contrasena) {
                throw new Error('Invalid credentials');
            }

            // Store user in localStorage
            const userToStore = { ...user };
            delete userToStore.contrasena; // Don't store password
            localStorage.setItem('UCBuser', JSON.stringify(userToStore));

            return {
                message: 'Login successful',
                user: userToStore
            };
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
            // Initialize mock users
            initializeMockUsers();

            // Check if user already exists
            const existingUser = findUserByEmail(email);
            if (existingUser) {
                throw new Error('User already exists');
            }

            // Add new user to mock data
            const newUser = addUser({ email, contrasena, nombre, telefono, direccion });

            // Store user in localStorage (without password)
            const userToStore = { ...newUser };
            delete userToStore.contrasena;
            localStorage.setItem('UCBuser', JSON.stringify(userToStore));

            return {
                message: 'User registered successfully',
                user: userToStore
            };
        } catch (error) {
            throw error;
        }
    }
};

export default authService;