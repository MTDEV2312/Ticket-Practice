import {body,param} from 'express-validator'
import { isCedula } from 'validator-ec'

const RegisterTicketValidator = [
    body('codigo')
        .trim()
        .notEmpty().withMessage('El codigo es requerido')
        .isString().withMessage('El codigo debe ser un string')
        .isLength({min:6}).withMessage('El codigo debe tener al menos 6 caracteres'),
    body('descripcion')
        .trim()
        .notEmpty().withMessage('La descripcion es requerida')
        .isString().withMessage('La descripcion debe ser un string')
        .isLength({min:10, max:150}).withMessage('La descripcion debe tener al menos 10 caracteres'),
    body('tecnico')
        .trim()
        .isNumeric().withMessage('La cedula del Tecnico debe ser un número')
        .isLength({min:10}).withMessage('La cedula del Tecnico debe tener al menos 10 caracteres')
        .custom((value)=>{
            const isValid=isCedula(value)
            if(!isValid){
                throw new Error('Cédula  ecuatoriana del Tecnico inválida')
            }
            return true
        }),
    body('cliente')
        .trim()
        .isNumeric().withMessage('La cedula del cliente debe ser un número')
        .isLength({min:10}).withMessage('La cedula del cliente debe tener al menos 10 caracteres')
        .custom((value)=>{
            const isValid=isCedula(value)
            if(!isValid){
                throw new Error('Cédula ecuatoriana del cliente inválida')
            }
            return true
        })
]

const TicketByIdValidator = [
    param('codigo')
        .trim()
        .notEmpty().withMessage('El codigo es requerido')
]

const UpdateTicketValidator =[
    param('id')
        .trim()
        .notEmpty().withMessage('El id es requerido')
        .isMongoId().withMessage("ID no valido"),
    body('descripcion')
        .trim()
        .notEmpty().withMessage('La descripcion es requerida')
        .isString().withMessage('La descripcion debe ser un string')
        .isLength({min:10, max:150}).withMessage('La descripcion debe tener al menos 10 caracteres'),
    body('tecnico')
        .trim()
        .notEmpty().withMessage('la cedula del tecnico es requerida')
        .isNumeric().withMessage('La cedula debe ser un número')
        .isLength({min:10}).withMessage('La cedula debe tener al menos 10 caracteres')
        .custom((value)=>{
            const isValid=isCedula(value)
            if(!isValid){
                throw new Error('Cédula ecuatoriana inválida')
            }
            return true
        }),
    body('status')
        .trim()
        .notEmpty().withMessage("El estado es requerido")
        .isIn(['Pendiente', 'En proceso', 'Completado']).withMessage("Estado Invalido")
]
const DeleteTicketValidator = [
    param('id')
    .trim()
    .notEmpty().withMessage('El id es requerido')
    .isMongoId().withMessage("ID no valido"),
]
export{
    RegisterTicketValidator,
    TicketByIdValidator,
    UpdateTicketValidator,
    DeleteTicketValidator
}