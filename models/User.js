const {Schema,model}= require('mongoose');
const Thoughts = require('./Though');

const UserSchema= new  Schema ({
  username: {
      type: String,
      unique: true,
      required:true,
      trim:true
      
      
  },
  email: {
      type: String,
      require:true,
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
  },
  thoughts: {
      type: Schema.Types.ObjectId,
      ref:Thoughts

  },
  friends : {
     type: Schema.Types.ObjectId,
     ref:User,
  }

});
UserSchema.virtual('friendCount').get(function(){
    return this.friends.length;
})

const User= model('User',UserSchema);

module.exports=User;