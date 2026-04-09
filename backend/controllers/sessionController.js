const { findUserByEmail, addUser } = require('../mockdata/usersMock');

const login = async (req, res) => {
  try {
    const { contrasena, email } = req.body;
    console.log(req.body);
    const user = findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    if (user.contrasena !== contrasena) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const userToReturn = { ...user };
    delete userToReturn.contrasena;
    res.json({ message: 'Login successful', user: userToReturn });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const logout = async (req, res) => {
  try {
    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const registerUser = async (req, res) => {
  try {
    const { contrasena, nombre, telefono, email, direccion } = req.body;
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }
    const user = addUser({ contrasena, nombre, telefono, email, direccion });
    const userToReturn = { ...user };
    delete userToReturn.contrasena;
    res.json({ message: 'User registered successfully', user: userToReturn });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  login,
  logout,
  registerUser
};