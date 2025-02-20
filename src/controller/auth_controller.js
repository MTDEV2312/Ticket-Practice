import user from '../models/users_model.js';

//* Login

const login = async (req,res) =>{
    try {
        //* Paso 1 tomar datos del Request
        const {email,password} = req.body

        //* Paso 2 Validar datos
        //? Verifica si un campo esta vacio
        if(Object.values(req.body).includes("")) {
            return res.status(400).json({msg: "Lo sentimos, debes llenar todos los campos"})
        }

        //? Verifica si el email es valido
        const userBDD = await user.findOne({email})
        if(!userBDD) {
            return res.status(400).json({msg: "Usuario o contraseña incorrectos."})
        }

        const verifyPassword = await  userBDD.ValidatePassword(password)

        if(!verifyPassword){
            return res.status(400).json({msg: "Usuario o contraseña incorrectos"})
        }
        // const tokenJWT = generarJWT(userBDD.id)
        res.status(200).json({msg: "Login exitoso"})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Lo sentimos, algo salio mal"})
    }
}

/*
const register = async (req,res) =>{
    const{password} = req.body
    try {
        const newUser = new user(req.body)
        newUser.password = await newUser.encryptPassword(password)
        newUser.save()
        res.status(201).json({msg: "Usuario creado exitosamente"})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Lo sentimos, algo salio mal"})
    }
}
*/

export {
    login
}

