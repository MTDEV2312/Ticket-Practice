import mongoose from "mongoose";

mongoose.set('strictQuery', true);

const connection = async () => {
    try {
        // Establecer al conexión con la BDD
        const {connection} = await mongoose.connect(process.env.MONGODB_URI)
        
        // Presentar la conexión en consola 
        console.log(`Database is connected on ${connection.host} - ${connection.port}`)
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

export default connection