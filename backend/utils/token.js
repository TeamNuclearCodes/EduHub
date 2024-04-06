import jwt from 'jsonwebtoken'

const genToken = (obj) => {
    return jwt.sign({
        _id: obj._id,
        username: obj.username
    },`${process.env.JWT_SECRET}`)
}

const decodeToken = (token) => {
    try {
        return jwt.verify(token, `${process.env.JWT_SECRET}`)
    } catch (error) {
        return false
    }
}

export {genToken, decodeToken}