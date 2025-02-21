import {Router} from 'express'
import {RegisterTicket,GetTickets,GetTicketsById,UpdateTicket,DeleteTicket} from '../controller/ticket_controller.js'
import {verifyJwt} from '../middlewares/jwt.js'
import {RegisterTicketValidator,TicketByIdValidator,UpdateTicketValidator,DeleteTicketValidator} from '../helpers/ticket_validator.js'
import {validateRequest} from '../middlewares/middleware_validator.js'

const router = Router()

router.post('/register-ticket',verifyJwt,RegisterTicketValidator,validateRequest,RegisterTicket)
router.get('/tickets',verifyJwt,GetTickets)
router.get('/tickets/:codigo',verifyJwt,TicketByIdValidator,validateRequest,GetTicketsById)
router.patch('/update-tickets/:id',verifyJwt,UpdateTicketValidator,validateRequest,UpdateTicket)
router.delete('/delete-tickets/:id',verifyJwt,DeleteTicketValidator,validateRequest,DeleteTicket)

export default router