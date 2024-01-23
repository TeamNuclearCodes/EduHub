import {Model, Schema, models} from 'mongoose'

const userSchema = new Schema({
    username: String
})

const User = models.User || Model("User",userSchema)
export default User