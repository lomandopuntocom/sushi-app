const prisma = require('@prisma/client')

const bcrypt = require('bcryptjs');

export const registrarUsuario = async (req, res) => {
    const { nombre, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const contrasena = await bcrypt.hash(password, salt);

    const nuevoUsuario = await prisma.usuarios.create({
        data: {
            nombre: nombre,
            email: email,
            contrasena: contrasena,
        }
    });

    res.status(201).json({
        mensaje: 'Usuario registrado con éxito usando Prisma',
        usuario: {
            id: nuevoUsuario.id,
            nombre: nuevoUsuario.nombre,
            email: nuevoUsuario.email,
        }
    });
};

//module.exports = {
    //registrarUsuario,};
