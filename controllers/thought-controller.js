
const {Thought,User,Reaction}=require('../models');

const ThoughtController= {
    // getall Thoughts
    getAllThoughts(req,res){
        Thought.find({})
        .populate({path: 'reactions',select: '-__v'})
        .select('-__v')
        .then(FindThought=>res.json(FindThought))
        .catch(err=> {
            console.log(err);
            res.status(400).json(err);
        })
    },
    // get Thought thoughts by id
    getThoughtById({params},res){
        Thought.FindOne({_id:params.id})
        .populate({path: 'reactions',select:'-__v'})
        .select('-__v')
        .then(ThoughtData=>{
            if(!ThoughtData){
                res.status(404).json({message:'no Thought found with this id!'});
                return;
            }
         
            res.json(ThoughtData);
        
        }).catch(err=>{
            console.log(err);
            res.status(400).json(err);
        });
        
    },
    createThought({body},res){
        Thought.create(body)
        .then(cThought=>{
            User.findOneandUpdate(
              {_id:body.userId},
              {$push: {thoughts: cThought._id}},
              {new:true},
            ).then(userThoughtData=>{
                if(!userThoughtData){
                    res.status(404).json({message:'No user found with this id'});
                    return;
                }
                res.json(userThoughtData);
            }).catch(err=> res.json(err));
        })
    },
    updateThought({params,body},res){
        Thought.findOneandUpdate
        ({_id:params.id},
            body,
            {new:true})
        .then(updatedThought => {
            if(!updatedThought){
                res.status(404).json({message: 'No pizza found with this id!'});
                return;
            }
            res.json(updatedThought);
        }).catch(err=> res.status(400));
    },
    


    delThought({params},res){
       delThought.findOneandDelete({_id:params.id})
       .then(delThought=>res.json(delThought))
       .catch(err=> res.json(err));
        
    },
    
};

module.exports=ThoughtController;