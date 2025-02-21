import {Router} from 'express'
import {getTech,getTechById,registerTech,updateTech,deleteTech} from '../controller/tech_controller.js'
import { verifyJwt } from '../middlewares/jwt.js'

const router = Router()

//* Rutas de tecnicos
router.get('/techs',verifyJwt,getTech)
router.get('/techs/:cedula',verifyJwt,getTechById)
router.post('/techs',verifyJwt,registerTech)
router.patch('/techs/:id',verifyJwt,updateTech)
router.delete('/techs/:id',verifyJwt,deleteTech)

export default router
