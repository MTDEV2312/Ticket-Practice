import {Schema,model} from 'mongoose'

const ticketSchema = new Schema({
    codigo:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    descripcion:{
        type:String,
        required:true,
        trim:true
    },
    tecnico:{
        type:String,
        ref:'Tech',
        required:true
    },
    cliente:{
        type:String,
        ref:'Client',
        required:true
    },
    status: {
        type: String,
        enum: ['Pendiente', 'En proceso', 'Completado'],
        default: 'Pendiente'
    }
})

export default model('Ticket',ticketSchema)