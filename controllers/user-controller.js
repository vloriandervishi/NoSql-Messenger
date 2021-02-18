const {User}=require('../models');

const UserController= {
    // getall Users
    getAllUsers(req,res){
        User.find({})
        .then(FindUser=>res.json(FindUser))
        .catch(err=> {
            console.log(err);
            res.status(400).json(err);
        })
    },
    // get User thoughts by id
    getUserById({params},res){
        User.FindOne({_id:params.id})
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

};

module.exports=UserController;