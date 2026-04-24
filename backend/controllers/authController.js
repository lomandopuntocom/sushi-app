const { findUserByEmail, addUser } = require('../mockdata/usersMock');

const login = (req, res) => {
  const { email, contrasena } = req.body;
  if (!email || !contrasena) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = findUserByEmail(email);
  if (!user || user.contrasena !== contrasena) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const userToReturn = { ...user };
  delete userToReturn.contrasena;
  res.json({ user: userToReturn });
};

const register = (req, res) => {
  const { email, contrasena, nombre, telefono, direccion } = req.body;

  if (!email || !contrasena || !nombre) {
    return res.status(400).json({ message: 'Email, password and name are required' });
  }

  const existingUser = findUserByEmail(email);
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const newUser = addUser({ email, contrasena, nombre, telefono, direccion });
  const userToReturn = { ...newUser };
  delete userToReturn.contrasena;
  res.json({ user: userToReturn });
};

module.exports = {
  login,
  register
};