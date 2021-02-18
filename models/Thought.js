const {Schema,model}=require('mongoose');

const ThoughtSchema= new Schema ({

    thoughtText: {
        type:String,
        match:'/^.{1,280}$/', // string must between 1 to 280 charactsers
        required:true,
        
    },
    createdAt:{
        type:Date,
        default:Date.now,
        get: createdAt=>dateformat(createdAt)
    },
    username: {
        type:String,
        Required:true,
    },
    reactions:[{
        type:String,
    }]
});

const Thoughts= model('Thought', ThoughtSchema);

module.exports=Thoughts;