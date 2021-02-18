const {Schema,model}=require('mongoose');
const reactionSchema=require('./Reaction');
const moment= require('moment');

const ThoughtSchema= new Schema ({

    thoughtText: {
        type:String,
        match:'/^.{1,280}$/', // string must between 1 to 280 charactsers
        required:true,
        
    },
    createdAt:{
        type:Date,
        default:Date.now,
        get: createdAt=>moment(createdAt).format('MMM DD,YYYY [at] h:mm a')
    },
    username: {
        type:String,
        Required:true,
    },
    reactions:[ reactionSchema]

},{
    toJSON:{
        virtuals:true,
        getters:true
    }
    id:false
});

ThoughtSchema.virtual('reactionCount').get(function(){
  return this.reactions.length;
});
const Thoughts= model('Thought', ThoughtSchema);

module.exports=Thoughts;