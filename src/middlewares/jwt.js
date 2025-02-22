import jwt from 'jsonwebtoken'
import User from '../models/users_model.js'

const generateJWT = (id) => {
    return jwt.sign({id}, process.env.SECRET_KEY, {expiresIn: "5h"})
}

const verifyJwt = async (req,res,next) => {
    if(!req.headers.authorization){
        return res.status(401).json({msg:"Lo sentimos, debes proporcionar un token"})
    }

    const {authorization} = req.headers

    try {
        const token = authorization.split(' ')[1]
        const decoded = jwt.verify(token,process.env.SECRET_KEY)
        const {id}= decoded
        // Verificar si el token esta expirado

        const tokenExp=decoded.exp * 1000
        if(Date.now() >= tokenExp){
            return res.status(401).json({msg:"Lo sentimos, tu token ha expirado",expired:true})
        }

        req.userId = await User.findById(id).lean().select("-password")
        if(!req.userId){
            return res.status(401).json({msg:"No tienes permisos para acceder a este recurso"})
        }
        next()
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                msg: "Token expirado, por favor inicie sesión nuevamente",
                expired: true
            })
        }
        return res.status(401).json({msg: "Formato del token no válido"})
    }
}

const verifyTokenStatus = async (req,res,next) => {
    if(!req.headers.authorization) {
        return res.status(401).json({msg: "Lo sentimos, debes proporcionar un token"})
    }    
    
    const {authorization} = req.headers
    
    try {
        const token = authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        
        // Verificar si el token está expirado
        const tokenExp = decoded.exp * 1000
        if (Date.now() >= tokenExp) {
            return res.status(401).json({
                msg: "Token expirado",
                expired: true
            })
        }

        return res.status(200).json({ valid: true })
        
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                msg: "Token expirado",
                expired: true
            })
        }
        return res.status(401).json({msg: "Token inválido"})
    }
}

export {generateJWT,verifyJwt,verifyTokenStatus}
