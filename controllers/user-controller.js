const {User}=require('../models');

const UserController= {
    // getall Users
    getAllUsers(req,res){
        User.find({})
        .populate({
            path: 'thoughts',
            select:'-__v'
        }).select('-__v')
        .sort({_id:-1})
        .then(FindUser=>res.json(FindUser))
        .catch(err=> {
            console.log(err);
            res.sendStatus(400);
        })
    },
    // get User thoughts by id
    getUserById({params},res){
        User.FindOne({_id:params.id})
        .populate({
            path:'thought',
            select:'-__v'
        })
        .select('-__v')
        .then(userData=>{
            if(!userData){
                res.status(404).json({message:'no user found with this id!'});
                return;
            }
         
            res.json(userData);
        
        }).catch(err=>{
            console.log(err);
            res.status(400).json(err);
        });
        
    },
    createUser({body},res){
        User.create(body)
        .then(cUser=> res.json(cUser))
        .catch(err=> res.json(err));
    },
    updateUser({params,body},res){
        User.findOneandUpdate({_d:params.id},body,{new:true,runValidators:true})
        .then(updatedUser => {
            if(!updatedUser){
                res.status(404).json({message: 'No pizza found with this id!'});
            }
            res.json(updatedUser);
        })
        .catch(err=> res.json(err));
    },
    delUser({params},res){
       delUser.findOneandDelete({_id:params.id})
       .then(delUser=>res.json(delUser))
       .catch(err=> res.json(err));
        
    }

};

module.exports=UserController;