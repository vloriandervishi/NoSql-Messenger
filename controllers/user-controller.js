const { User, Thought } = require("../models");

const UserController = {
  // getall Users
  getAllUsers(req, res) {
    User.find({})
      .select("-__v")
      .then((FindUser) => res.json(FindUser))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  // get User thoughts by id
  getUserById({ params }, res) {
    User.FindOne({ _id: params.id })
      .populate(
        {
          path: "thought",
          select: "-__v",
        },
        {
          path: "friends",
          select: "-__v",
        }
      )
      .select("-__v")
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "no user found with this id!" });
          return;
        }

        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  createUser({ body }, res) {
    User.create(body)
      .then((cUser) => res.json(cUser))
      .catch((err) => res.json(err));
  },
  updateUser({ params, body }, res) {
    User.findOneandUpdate({ _d: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((updatedUser) => {
        if (!updatedUser) {
          res.status(404).json({ message: "No pizza found with this id!" });
        }
        res.json(updatedUser);
      })
      .catch((err) => res.json(err));
  },
  delUser({ params }, res) {
    User
      .findOneandDelete({ _id: params.id })
      .then((delUser) => {
      if(!delUser){
          res.status(400).json({message: 'no user found with this id'});
          return;
      }
      User.updateMany(
          {_id: {$in:delUser.friends}},
          {$pull:{friends: params.id}}
      ).then(()=>{
          res.json({message:'deleted successfully user'});
      }).catch(err=>{
          res.json(400).json(err);
      })
    })
      .catch((err) => res.json(err));
  },
  confirmFriend({params},res){
      User.findOneandUpdate(
          {_id:params.userId},
          {$addToset:{friends: params.friendId}},
          {new:true,runValidators:true}
      ).then(cF=>{
          if(!cF){
              res.status(400).json({message:'no user found with this id'})
              return;
          }
          User.findOneandUpdate(
            {_id:params.friendId},
            {$addToset:{friends:params.userId}},
            {new:true,runValidators:true}
          ).then(cf2=>{
              if(!cf2){
                  res.status(400).json({message:"No user with the friend id"});
                  return;
              }
              res.json(cf2);
          }).catch(err=>res.status(400).json(err));
      }).catch(err=>res.status(400).json(err));

  },
  unconfirmFriend({params},res){
      User.findOneAndUpdate(
          {_id:params.userId},
          {$pull: {friends:params.userId}},
          {new:true,runValidators:true}
      ).then(uF=>{
          if(!uF){
              res.status(400).json({message:'no user found with this userid'});
              return;
          }
          User.findOneAndUpdate(
              {_id:params.friendId},
              {$pull:{friends:params.userId}},
              {new:true,runValidators:true}
          ).then(uf2=>{
              if(!uf2){
                  res.status(400).json({message:'no user found with the friendId'});
                  return;
              }
              res.json({message:'No user found with this friendId'});
          }).catch(err=>{
              res.status(400).json(err);
          })
      }).catch(err=>{
          res.status(400).json(err);
      })
  }
};

module.exports = UserController;
