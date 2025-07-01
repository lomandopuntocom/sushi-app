require('dotenv').config();
const express = require('express');
const cors = require('cors');
const menuRoutes = require('./routes/menuRoutes');
const blogRoutes = require('./routes/blogRoutes');
const loginRoutes = require('./routes/loginRoutes');
const registerRoutes = require('./routes/registerRoutes');
const reservationRoutes = require('./routes/reservationRoutes')
const sessionRoutes = require('./routes/sessionRoutes')

const app = express();
const PORT = process.env.PORT || 3000;
if(process.env.ENV != "dev"){
  app.use(cors({
    origin: process.env.FRONTEND_URL, 
    optionsSuccessStatus: 200 
  }));
}else{
  app.use(cors());
}
app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Sushi App!');
});

app.use('/api/session', sessionRoutes)

app.use('/api/menu', menuRoutes);

app.use('/api/blog', blogRoutes);

app.use('/api/reservation', reservationRoutes);


app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});