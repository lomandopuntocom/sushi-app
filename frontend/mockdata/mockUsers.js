// Mock users data for testing
export const mockUsers = [
    {
        id: 'user1',
        email: 'test@example.com',
        nombre: 'Test User',
        contrasena: 'password123',
        telefono: '1234567890',
        direccion: '123 Main St'
    },
    {
        id: 'user2',
        email: 'demo@example.com',
        nombre: 'Demo User',
        contrasena: 'demo123',
        telefono: '9876543210',
        direccion: '456 Oak Ave'
    }
];

// Storage key for users in localStorage
export const USERS_STORAGE_KEY = 'sushi-app-users';

// Initialize users in localStorage if not already done
export function initializeMockUsers() {
    const existingUsers = localStorage.getItem(USERS_STORAGE_KEY);
    if (!existingUsers) {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(mockUsers));
    }
}

// Get all users from localStorage
export function getAllUsers() {
    try {
        const users = localStorage.getItem(USERS_STORAGE_KEY);
        return users ? JSON.parse(users) : [];
    } catch (e) {
        console.error('Error reading users from localStorage:', e);
        return [];
    }
}

// Find user by email
export function findUserByEmail(email) {
    const users = getAllUsers();
    return users.find(user => user.email === email);
}

// Add new user
export function addUser(userData) {
    const users = getAllUsers();
    const newUser = {
        id: 'user' + Date.now(),
        ...userData
    };
    users.push(newUser);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    return newUser;
}
