import {Router} from 'express'
import {login} from '../controller/auth_controller.js'
import { verifyTokenStatus } from '../middlewares/jwt.js'
import validateLogin from '../helpers/auth_validator.js'
import {validateRequest} from '../middlewares/middleware_validator.js'


const router = Router()

//* Rutas de autenticacion
router.post('/login',validateLogin,validateRequest,login)
router.get('/verify-token',verifyTokenStatus)


export default router