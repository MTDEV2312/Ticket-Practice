import {body} from 'express-validator'

const regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const validateLogin = [
    body('email')
        .trim()
        .notEmpty().withMessage('El email es requerido')
        .isEmail().withMessage('El email no es valido')
        .matches(regexEmail).withMessage('Formato de usuario inválido'),
    body('password')
        .trim()
        .notEmpty().withMessage('La contraseña es requerida')
        .isLength({min:8}).withMessage('La contraseña debe tener al menos 8 caracteres')
        .matches(regexPassword).withMessage('La contraseña debe tener al menos una letra y un número')
]

export default validateLogin