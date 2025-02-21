import Tech from '../models/tech_model.js';

const registerTech = async (req,res) => {
    try {
            //* Paso 1 tomar datos del Request
        const {cedula,email,password}=req.body

        //* Paso 2 Validar datos

        //? Verifica si un campo esta vacio
        if(Object.values(req.body).includes("")) {
            return res.status(400).json({msg: "Lo sentimos, debes llenar todos los campos"})
        }

        //? Verifica si el email es valido
        const techBDD = await Tech.findOne({email})
        if(techBDD) {
            return res.status(400).json({msg: "El email ya esta registrado"})
        }

        //? Verifica si la cedula es valida
        const techBDDID = await Tech.findOne({cedula}) 
        if(techBDDID){
            return res.status(400).json({msg: "La cedula ya esta registrada"})
        }

        //* Paso 3 Interactuar con BDD

        const newTech = new Tech(req.body)
        await newTech.save()

        return res.status(201).json({msg: "Tecnico creado exitosamente"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Lo sentimos, algo salio mal"})
    }
}

const getTech = async (req,res) => {
    try {
        const techs = await Tech.find()
        const response =techs.map(tech => ({
            _id: tech.id,
            cedula: tech.cedula,
            nombre: tech.nombre,
            apellido: tech.apellido,
            email: tech.email,
            fecha_nacimiento: tech.fecha_nacimiento,
            genero: tech.genero,
            direccion: tech.direccion,
            telefono: tech.telefono
        }))
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Lo sentimos, algo salio mal"})
    }
}

const getTechById = async (req,res) => {
    try {
        const {cedula}=req.params

        if(!cedula){
            return res.status(400).json({msg: "Lo sentimos, debes proporcionar un cedula"})
        }

        const techBDD = await Tech.findOne({cedula})
        if(!techBDD){
            return res.status(400).json({msg: "El tecnico no existe"})
        }
        const response = {
            _id: techBDD.id,
            cedula: techBDD.cedula,
            nombre: techBDD.nombre,
            apellido: techBDD.apellido,
            email: techBDD.email,
            fecha_nacimiento: techBDD.fecha_nacimiento,
            genero: techBDD.genero,
            direccion: techBDD.direccion,
            telefono: techBDD.telefono
        }
        return res.status(200).json(response)

    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Lo sentimos, algo salio mal"})
    }
}

const updateTech = async (req,res) => {
    try {
        const {id}=req.params
        const updates= req.body

        if(!id){
            return res.status(400).json({msg: "Lo sentimos, debes proporcionar un id de tecnico"})
        }
        // Obtener los datos del tecnico a actualizar
        const validFields = ['nombre','apellido','email','fecha_nacimiento','genero','direccion','telefono','email']
        const filteredFields={}

        for(const field in updates){
            if(validFields.includes(field)){
                filteredFields[field]=updates[field]
            }
        }
        
            // Validar si hay campos válidos para actualizar
        if (Object.keys(filteredFields).length === 0) {
            return res.status(400).json({ msg: "No se proporcionaron campos válidos para actualizar" })
        }

        await Tech.findByIdAndUpdate(id,filteredFields,{new:true})

        const response = await Tech.findById(id).lean().select("-__v")

        return res.status(200).json({msg: "Tecnico actualizado exitosamente",response})

    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Lo sentimos, algo salio mal"})
    }
}

const deleteTech = async(req,res) => {
    const {id}=req.params

    if(!id){
        return res.status(400).json({msg: "Lo sentimos, debes proporcionar un id"})
    }

    try {
        const deletedTech = await Tech.findByIdAndDelete(id)
        if(!deletedTech){
            return res.status(400).json({msg: "El tecnico no existe"})
        }
        return res.status(200).json({msg: "Tecnico eliminado exitosamente"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Lo sentimos, algo salio mal"})
    }
}



export {
    registerTech,
    getTech,
    getTechById,
    updateTech,
    deleteTech
}
