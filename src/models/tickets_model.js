import {Schema,model} from 'mongoose'

const ticketSchema = new Schema({
    codigo:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    descipcion:{
        type:String,
        required:true,
        trim:true
    },
    tecnico:{
        type:Schema.Types.ObjectId,
        ref:'Tech',
        required:true
    },
    cliente:{
        type:Schema.Types.ObjectId,
        ref:'Client',
        required:true
    },
})

export default model('Ticket',ticketSchema)