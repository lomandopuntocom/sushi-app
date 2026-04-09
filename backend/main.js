require('dotenv').config();
const express = require('express');
const cors = require('cors');
const menuRoutes = require('./routes/menuRoutes');
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration - allow all origins for development
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Sushi App!');
});

app.use('/api/auth', authRoutes);
app.use('/api/session', sessionRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/reservation', reservationRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});