import {Schema,model} from 'mongoose'

const clientSchema = new Schema({
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
    ciudad:{
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
    direccion:{
        type:String,
        required:true,
        trim:true
    },telefono:{
        type:String,
        required:true,
        trim:true
    },
    fecha_nacimiento:{
        type:Date,
        required:true
    },
    dependencia:{
        type:String,
        required:true,
        trim:true
    }
})

export default model('Client',clientSchema)