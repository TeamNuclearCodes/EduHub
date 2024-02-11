import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: String,
  chatgrps: {
    type: [String],
    required: false,
  },
});

const User = mongoose.model("User",userSchema)
export default User