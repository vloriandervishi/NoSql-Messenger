const { Schema, model } = require("mongoose");
//const Thoughts = require("./Thought");

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: 'Need to enter Username please!',
    trim: true,
  },
  email: {
    type: String,
    required: "Please enter email please!",
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Thoughts"
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref:"User"
    },
  ],
},{
  toJSON:{
    virtuals:true,
    getters:true
  },
  id:false
});
UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;
