
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
       .then(delThought=>{
         if(!delThought){
             res.status(404).json({message: 'no user with this id '});
             return;
         }
         User.findOneandUpdate(
            {username:delThought.username},
             { $pull:{thought:params.id}}
         ) .then(()=>{
           res.json({message: 'Successfully deleted thought'});
       })
       .catch(err=> res.status(500).json(err));
    }).catch(error=> res.status(500).json(err))  ;
    },

    affirmReaction({params,body},res){
        Thought.findOneandUpdate({
            _id:params.thoughtId
        },
        {$pull: {reactions:{reactionId: body.reactionId}}},
        {new:true,runValidators:true})
        .then(uThought =>{
            if(!uThought){
                res.status(400).json({message:'No thoughts found with this id'});
                return;
            }
            res.json(uThought);

        }).catch(err=> res.staus(500).json(err))
    },
    negateReaction({params,boy},res){
        Thought.findOneAndUpdate(
            {_id:params.thoughtId},
            {$pull:{reactions:{reactionId: body.reactionId}}},
            {new: true, runValidators:true}
        ).then(nThReaction=>{
            if(!nThReaction){
                res.status(400).json({message:'No thought with this id'});
                return;
            }
            res.json({message:'Deleted thoughts with no problem'});

        }).catch(err=>res.status(500).json(err));

    }
    
};

module.exports=ThoughtController;