const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const menuRoutes = require('./routes/menuRoutes');
const blogRoutes = require('./routes/blogRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigin = process.env.ENV !== 'dev' ? process.env.FRONTEND_URL : undefined;
const corsOptions = allowedOrigin ? { origin: allowedOrigin, optionsSuccessStatus: 200 } : {};
app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Sushi App!');
});

app.use('/api/session', sessionRoutes);

app.use('/api/menu', menuRoutes);

app.use('/api/blog', blogRoutes);

app.use('/api/reservation', reservationRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});