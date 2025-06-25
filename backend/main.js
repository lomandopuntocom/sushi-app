require('dotenv').config();
const express = require('express');
const cors = require('cors');
const usuarioRoutes = require('./routes/usuarioRoutes');
const menuRoutes = require('./routes/menuRoutes');
const blogRoutes = require('./routes/blogRoutes');

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

app.use('/api/usuario', usuarioRoutes);

app.use('/api/menu', menuRoutes);

app.use('/api/blog', blogRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});