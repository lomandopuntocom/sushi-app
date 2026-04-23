const prisma = require('../prisma/client');

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.usuario.create({
      data: { username, password }
    });
    res.json(user);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  registerUser
};
