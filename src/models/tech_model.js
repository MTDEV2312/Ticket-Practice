import {Schema,model} from 'mongoose'

const techSchema = new Schema({
    cedula:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    nombre:{
        type:String,
        required:true,
        trim:true
    },
    apellido:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    fecha_nacimiento:{
        type:Date,
        required:true
    },
    genero:{
        type:String,
        required:true,
        trim:true
    },
    direccion:{
        type:String,
        required:true,
        trim:true
    },telefono:{
        type:String,
        required:true,
        trim:true
    }
})

export default model('Tech',techSchema)