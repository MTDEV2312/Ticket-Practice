import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Inicializaciones

const app = express();
dotenv.config();

// Configuraciones

app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(express.json());


// Variables Globales

// Rutas

app.get('/',(req,res)=>{
    res.send('Server on 👨‍💻✅');
})


//Rutas no encontradas

app.use((req,res)=>res.status(404).send("EndPoint no encontrado - 404"))

// Exportar la instancia de express por medio de app
export default  app;