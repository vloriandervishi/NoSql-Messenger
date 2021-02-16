const {Schema,model}= require('mongoose');
const Thoughts = require('./Though');

const UserSchema= new  Schema ({
  username: {
      type: String,
      unique: true,
      required:true,
      Trimmed:true
      
      
  },
  email: {
      type: String,
      require:true,
      unique: true,
      validate: {
        validator: () => Promise.resolve(false),
        message: 'Email validation failed'
      }
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