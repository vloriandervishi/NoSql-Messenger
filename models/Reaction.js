const { ObjectId } = require('bson');
const {Schema,model}=require('mongoose');
const Thoughts = require('./Though');

const ReactionSchema=new Schema({
   reactionId: {
       type: Schema.Types.ObjectId,
       default: new ObjectId,
   },
   reactionBody:{
       type:String,
       required:true,
       len:{

       }
   },
   username:{
       type:String,
       required:true,

   },
   createdAt:{
       type:Date,
       default:Date.now,
    // use a getterto format timestamp
   }
});
ReactionSchema.virtual('reaction').get(function(){
     ref:Thoughts;
})


module.exports=ReactionSchema;