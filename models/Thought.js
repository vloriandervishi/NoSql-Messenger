const {Schema,model}=require('mongoose');
const reactionSchema=require('./Reaction');
const moment= require('moment');

const ThoughtSchema= new Schema ({

    thoughtText: {
        type:String,
        min:1, // string must between 1 to 280 charactsers
        max:280,
        required:"Please enter a thought !",
        
    },
    createdAt:{
        type:Date,
        default:Date.now,
        get: createdAt=>moment(createdAt).format('MMM DD,YYYY [at] h:mm a')
    },
    username: {
        type:String,
        required: "please enter a username!",
    },
    reactions:[ reactionSchema]

},{
    toJSON:{
        virtuals:true,
        getters:true
    },
    id:false
});

ThoughtSchema.virtual('reactionCount').get(function(){
  return this.reactions.length;
});
const Thoughts= model('Thoughts', ThoughtSchema);

module.exports=Thoughts;