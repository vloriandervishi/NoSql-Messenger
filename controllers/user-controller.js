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
    }

};

module.exports=UserController;