
const {Schema,model}=require('mongoose');
const moment = require('moment');

const ReactionSchema=new Schema({
   reactionId: {
       type: Schema.Types.ObjectId,
       default: () => new Types.ObjectId(),
   },
   reactionBody:{
       type:String,
       require:"Please enter Reaction",
       minLength:1,
       maxLength:280
   },
   username:{
       type:String,
       required:"Please enter username",

   },
   createdAt:{
       type:Date,
       default:Date.now,
       get:(createdAt)=> moment (createdAt).format('MMM DD,YYYY [at] hh:mm a')
       
   }
  
},
{
    toJSON:{
        getters:true
    },
    
});



module.exports=ReactionSchema;