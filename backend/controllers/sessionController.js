const prisma = require('../prisma/client')

const login = async (req, res) => {
    try{
        const { email, contrasena } = req.body;
        const user = await prisma.usuario.findUnique({ where: { email } });
        if(!user){
            return res.status(401).json({ error: "user do not exist" });
        }
        if(user.contrasena !== contrasena){
            return res.status(401).json({ error: "incorrect password" });
        }
        res.json({ message: "Succesfull login", user })
    }
    catch(error) {
        console.error("Error during appointment:", error)
        res.status(500).json({error: 'Internal server error'})
    }
};

const registration = async (req, res) =>{
    try{
        const { nombre, telefono, email, contrasena, direccion } = req.body;
        const user = await prisma.usuario.create({
            data: { nombre, telefono, email, contrasena, direccion }
        });
        res.json(user)
    }
    catch(error){
        console.error("Error to create user", error);
        res.status(500).json({error: 'Internal error server'});
    }
}

module.exports = {
    login,
    registration
};