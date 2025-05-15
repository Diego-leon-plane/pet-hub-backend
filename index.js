const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
console.log("JWT_SECRET: ", process.env.JWT_SECRET)

const app = express();
app.use(cors({
    origin: 'http://localhost:4200'
}));
app.use(express.json());

//Rutas 
const usuarioRoutes = require('./src/routes/usuarios.routes')
const mascotasRoutes = require('./src/routes/mascotas.routes')
const citasRoutes = require('./src/routes/citas.routes')

app.use('/usuarios', usuarioRoutes) //POST /usuarios 
app.use('/auth', usuarioRoutes) //POST /auth/login
app.use('/mascotas', mascotasRoutes)
app.use('/citas', citasRoutes)

//Prueba 
app.get('/', (req, res) => {
    res.send('Servidor funcionando')
})

//Puerto 
const PORT = process.env.PORT || 3200;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
