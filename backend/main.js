require('dotenv').config();
const express = require('express');
const cors = require('cors');
const menuRoutes = require('./routes/menuRoutes');
const blogRoutes = require('./routes/blogRoutes');
<<<<<<< HEAD
const authRoutes = require('./routes/authRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
=======
const loginRoutes = require('./routes/loginRoutes');
const registerRoutes = require('./routes/registerRoutes');
>>>>>>> parent of 2910879 (implementacion inicio de sesion y CRUD de blogs)

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration - allow all origins for development
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Sushi App!');
});

<<<<<<< HEAD
app.use('/api/auth', authRoutes);
app.use('/api/session', sessionRoutes);
=======
app.use('/api/login', loginRoutes);

app.use('/api/register', registerRoutes);

>>>>>>> parent of 2910879 (implementacion inicio de sesion y CRUD de blogs)
app.use('/api/menu', menuRoutes);
app.use('/api/blog', blogRoutes);
<<<<<<< HEAD
app.use('/api/reservation', reservationRoutes);
=======
>>>>>>> parent of 2910879 (implementacion inicio de sesion y CRUD de blogs)

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});