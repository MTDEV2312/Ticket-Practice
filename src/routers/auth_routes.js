import {Router} from 'express'
import {login} from '../controller/auth_controller.js'

const router = Router()

//* Rutas de autenticacion
router.post('/login',login)

export default router