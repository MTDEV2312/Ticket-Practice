import ticket from '../models/tickets_model.js'
import tech from '../models/tech_model.js'
import client from '../models/clients_model.js'

const RegisterTicket = async (req,res) => {
    try {
        const {tecnico,cliente,codigo} =req.body

        //? Verifica si un campo esta vacio
        if(Object.values(req.body).includes("")) {
            return res.status(400).json({msg: "Lo sentimos, debes llenar todos los campos"})
        }
        
        const clientExist = await client.findOne({cedula:cliente})
        
        if(!clientExist){
            return res.status(400).json({msg: "El cliente no existe"})
        }
    
        const techExist = await tech.findOne({cedula:tecnico})
        if(!techExist){
            return res.status(400).json({msg: "El tecnico no existe"})
        }
    
        const newTicket = new ticket(req.body)
        await newTicket.save()
        const response ={
            _id:newTicket._id,
            codigo:newTicket.codigo,
            descipcion:newTicket.descipcion,
            tecnico:techExist,
            cliente:clientExist
        }
        res.status(201).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Lo sentimos, ha ocurrido un error"})
    }
}

const GetTickets = async (req,res) => {
    try {
        const tickets = await ticket.find()
        const clientsID = [... new Set(tickets.map(ticket => ticket.cliente))]
        const techsID = [... new Set(tickets.map(ticket => ticket.tecnico))]

        const clients = await client.find({cedula:{$in:clientsID}})
        const techs = await tech.find({cedula:{$in:techsID}})

        const clientMap = clients.reduce((map,client) => {
            map[client.cedula] = {
                _id:client._id,
                cedula:client.cedula,
                nombre:client.nombre,
                apellido:client.apellido,
                email:client.email,
                telefono:client.telefono,
                direccion:client.direccion,
                dependencia:client.dependencia
            }
            return map
        },{})

        const techMap = techs.reduce((map,tech) => {
            map[tech.cedula] = {
                _id:tech._id,
                cedula:tech.cedula,
                nombre:tech.nombre,
                apellido:tech.apellido,
                email:tech.email,
                telefono:tech.telefono,
                direccion:tech.direccion,
                genero:tech.genero
            }
            return map
        },{})

        const ticketMap = tickets.map(ticket => {
            return {
                _id:ticket._id,
                codigo:ticket.codigo,
                descipcion:ticket.descipcion,
                tecnico:techMap[ticket.tecnico] || null,
                cliente:clientMap[ticket.cliente] || null
            }
        })

        res.status(200).json(ticketMap)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Lo sentimos, ha ocurrido un error"})
    }
}

const GetTicketsById = async (req,res) => {
    try {
        const {codigo}=req.params

        if(!codigo){
            return res.status(400).json({msg: "Lo sentimos, debes proporcionar un codigo"})
        }

        const ticketBDD = await ticket.findOne({codigo:codigo})

        if(!ticketBDD){
            return res.status(400).json({msg: "Lo sentimos, el ticket no existe"})
        }

        const CID = ticketBDD.cliente
        const TID = ticketBDD.tecnico
        const clientID = await client.findOne({cedula:CID})
        const techID = await tech.findOne({cedula:TID})

        const clientDetails = clientID ?{
            _id:clientID._id,
            cedula:clientID.cedula,
            nombre:clientID.nombre,
            apellido:clientID.apellido,
            email:clientID.email,
            telefono:clientID.telefono,
            direccion:clientID.direccion,
            dependencia:clientID.dependencia
        }:null

        const techDetails = techID ?{
            _id:techID._id,
            cedula:techID.cedula,
            nombre:techID.nombre,
            apellido:techID.apellido,
            email:techID.email,
            telefono:techID.telefono,
            direccion:techID.direccion,
            genero:techID.genero
        }:null

        const ticketDetail = {
            _id:ticketBDD._id,
            codigo:ticketBDD.codigo,
            descripcion:ticketBDD.descripcion,
            tecnico:techDetails,
            cliente:clientDetails
        }
        return res.status(200).json(ticketDetail)
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Lo sentimos, algo salio mal"})
    }
}

const UpdateTicket = async (req,res) => {
    try {
        const {id} = req.params
        const updates = req.body
    
        if(Object.values(req.body).includes("")) {
            return res.status(400).json({msg: "Lo sentimos, debes llenar todos los campos"})
        }
    
        const validFields = ['codigo','descipcion','tecnico','status']
        const filteredFields = {}
    
        for(const field in updates){
            if(validFields.includes(field)){
                filteredFields[field]=updates[field]
            }
        }
    
        if (Object.keys(filteredFields).length === 0) {
            return res.status(400).json({ msg: "No se proporcionaron campos válidos para actualizar" })
        }
    
        await ticket.findByIdAndUpdate(id,filteredFields,{new:true})
    
        const response = await ticket.findById(id).lean().select("-__v")
        res.status(200).json({msg:"Ticket actualizado",response})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Lo sentimos, ha ocurrido un error"})
    }
}

const DeleteTicket = async (req,res) => {
    try {
        const {id} = req.params
        if(!id){
            return res.status(400).json({msg: "Lo sentimos, debes proporcionar un id"})
        }
        await ticket.findByIdAndDelete(id)
        res.status(200).json({msg:"Ticket eliminado"})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Lo sentimos, ha ocurrido un error"})
        
    }
}





export {
    RegisterTicket,
    GetTickets,
    GetTicketsById,
    UpdateTicket,
    DeleteTicket
}
