import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  email: String,
  chatgrps: {
    type: [String],
    required: false,
  },
  frnds: {          // keeping this as backup :)
    type: [String],
    required: false,
  },
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  name: String,
  college: String,
  semester: String,
  profileImage: String
});

const User = mongoose.model("User",userSchema)
export default User