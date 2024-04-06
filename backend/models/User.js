import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  chatgrps: {
    type: [String],
    required: false,
  },
  frnds: {
    type: [String],
    required: false,
  },
  name: String,
  college: String,
  semester: String,
});

const User = mongoose.model("User",userSchema)
export default User