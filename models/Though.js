const {Schema,model}=require('mongoose');

const ThoughtSchema= new Schema ({

    thoughtText: {
        type:String,
        required:true,
        // len: {

        // }
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    username: {
        type:String,
        Required:true,
    },
    reactions:{
        type:
    }
});

const Thoughts= model('Thought', ThoughtSchema);

module.exports=Thoughts;