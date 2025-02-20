import {Schema,model} from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
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
    password:{
        type:String,
        required:true,
        trim:true
    }
},{
    timestamps:true
})


//* Metodos
userSchema.methods.encryptPassword = async password =>{
    const salt = await bcrypt.genSalt(10)
    const passwordEncrypted = await bcrypt.hash(password,salt)
    return passwordEncrypted
}

userSchema.methods.ValidatePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

export default model('User',userSchema)