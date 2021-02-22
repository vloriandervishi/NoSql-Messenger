const { User } = require("../models");
const Thought = require("../models");

const UserController = {
  // getall Users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: "thoughts",
        select: "-__v -username",
      })
      .populate({
        path: "friends",
        select: "-__v -thought",
      })
      .select("-__v")
      .then((FindUser) => res.json(FindUser))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  // get User thoughts by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.userId })
      .populate({
        path: "thought",
        select: "-__v -username",
      })
      .populate({
        path: "friends",
        select: "-__v  -thoughts",
      })
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
    User.findOneAndUpdate({ _id: params.userId }, body, {
      new: true,
    })
      .then((updatedUser) => {
        if (!updatedUser) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(updatedUser);
      })
      .catch((err) => res.json(err));
  },
  delUser({ params }, res) {
    User.findOneAndDelete({ _id: params.userId })
      .then((delUser) => {
        if (!delUser) {
          res.status(400).json({ message: "no user found with this id" });
          return;
        }
        User.updateMany(
          { _id: { $in: delUser.friends } },
          { $pull: { friends: params.id } }
        )
          .then(() => {
            res.json({ message: "deleted successfully user" });
          })
          .catch((err) => {
            res.json(400).json(err);
          });
      })
      .catch((err) => res.json(err));
  },
  confirmFriend({ params }, res) {
    console.log(params);
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((cF) => {
        if (!cF) {
          res.status(400).json({ message: "no user found with this id" });
          return;
        }
        res.json({message:"Successfully added Friend"});
        console.log(cF);
      })
      .catch((err) => {
        res.status(400).json(err);
        console.log(err);
      });
  },
  unconfirmFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((uF) => {
        if (!uF) {
          res.status(400).json({ message: "no user found with this userid" });
          return;
        }
        res.json({message: "Successfully removed Friend "});
        console.log(uF);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
};

module.exports = UserController;
