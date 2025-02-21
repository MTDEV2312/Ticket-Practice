import {Router} from 'express'
import {login} from '../controller/auth_controller.js'
import { verifyTokenStatus } from '../middlewares/jwt.js'


const router = Router()

//* Rutas de autenticacion
router.post('/login',login)
router.get('/verify-token',verifyTokenStatus)


export default router