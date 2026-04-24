const prisma = require('../prisma/client');

const login = async (req, res) => {
  try {
    const { contrasena, email } = req.body;
    console.log(req.body);
    const user = await prisma.usuario.findUnique({
      where: {
        email: email,
      }
    });
  
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    if (user.contrasena !== contrasena) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.json({ message: 'Login successful', user });
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
    const user = await prisma.usuario.create({
      data: { contrasena, nombre, telefono, email, direccion }
    });
    res.json({ message: 'User registered successfully', user });
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