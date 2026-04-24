const users = [
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

function findUserByEmail(email) {
  return users.find(user => user.email === email);
}

function addUser(userData) {
  const newUser = {
    id: `user${Date.now()}`,
    ...userData
  };
  users.push(newUser);
  return newUser;
}

function getAllUsers() {
  return users;
}

module.exports = {
  findUserByEmail,
  addUser,
  getAllUsers
};