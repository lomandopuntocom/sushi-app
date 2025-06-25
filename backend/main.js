require('dotenv').config();
const express = require('express');
const cors = require('cors');
const usuarioRoutes = require('./routes/usuarioRoutes');

dotenv.config();

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

app.use('/api/usuario', usuarioRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});