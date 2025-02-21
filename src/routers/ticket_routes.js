import {Router} from 'express'
import {RegisterTicket,GetTickets,GetTicketsById,UpdateTicket,DeleteTicket} from '../controller/ticket_controller.js'
import {verifyJwt} from '../middlewares/jwt.js'

const router = Router()

router.post('/register-ticket',verifyJwt,RegisterTicket)
router.get('/tickets',verifyJwt,GetTickets)
router.get('/tickets/:codigo',verifyJwt,GetTicketsById)
router.patch('/update-tickets/:id',verifyJwt,UpdateTicket)
router.delete('/delete-tickets/:id',verifyJwt,DeleteTicket)

export default router