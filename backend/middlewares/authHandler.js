import { decodeToken } from "../utils/token.js"

const authHandler = (req,res,next) => {
    const token = req.headers.authorization;
    if (token) {
        const data = decodeToken(token)
        if (data) next()
        else res.json({error: 'Invalid Token'}).status(403)
    } else {
        res.json({error: 'You don\'t have permission to access this resource'}).status(403)
    }
}

export default authHandler