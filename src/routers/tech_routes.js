import {Router} from 'express'
import {getTech,getTechById,registerTech,updateTech,deleteTech} from '../controller/tech_controller.js'
import { verifyJwt } from '../middlewares/jwt.js'
import {registerValidator,ByIdValidator,updateValidator,deleteValidator} from '../helpers/tech_validator.js'
import {validateRequest} from '../middlewares/middleware_validator.js'

const router = Router()

//* Rutas de tecnicos
router.get('/techs',verifyJwt,getTech)
router.get('/techs/:cedula',verifyJwt,ByIdValidator,validateRequest,getTechById)
router.post('/techs',verifyJwt,registerValidator,validateRequest,registerTech)
router.patch('/techs/:id',verifyJwt,updateValidator,validateRequest,updateTech)
router.delete('/techs/:id',verifyJwt,deleteValidator,validateRequest,deleteTech)

export default router
