const { Thought, User, Reaction } = require("../models");

const ThoughtController = {
  // getall Thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .select("-__v")
      .sort({ _id: -1 })
      .then((FindThought) => res.json(FindThought))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // get Thought thoughts by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })

      .then((ThoughtData) => {
        if (!ThoughtData) {
          res.status(404).json({ message: "no Thought found with this id!" });
          return;
        }

        res.json(ThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  createThought({ body }, res) {
    Thought.create(body).then(({ _id }) => {
      return User.findOneAndUpdate(
        { _id: body.userId },
        { $push: { thoughts: _id } },
        { new: true }
      )
        .then((userThoughtData) => {
          if (!userThoughtData) {
            res.status(404).json({ message: "No User found with this id" });
            return;
          }
          res.json(userThoughtData);
        })
        .catch((err) => res.json(err));
    });
  },
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true })
      .then((updatedThought) => {
        if (!updatedThought) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(updatedThought);
      })
      .catch((err) => res.status(400).json(err));
  },

  delThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((delThought) => {
        if (!delThought) {
          res.status(404).json({ message: "no thought with this id " });
          return;
        }
        User.findOneAndUpdate(
          { username: delThought.username },
          { $pull: { thought: params.thoughtId } }
        )
          .then(() => {
            res.json({ message: "Successfully deleted thought" });
          })
          .catch((err) => res.status(500).json(err));
      })
      .catch((error) => res.status(500).json(err));
  },

  affirmReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      {
        _id: params.thoughtId
      },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((uThought) => {
          console.log(uThought);
        if (!uThought) {
          res.status(400).json({ message: "No reaction found with this id" });
          return;
        }
        res.json(uThought);
        console.log(uThought);
      })
      .catch((err) => {
        res.status(400).json(err);
        console.log(err);
      });
  },
  negateReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((nThReaction) => {
          console.log(nThReaction);
        if (!nThReaction) {

          res.status(400).json({ message: "No reaction with this id" });
          return;
        }
        console.log(nThReaction);
        res.json({ message: "Deleted reaction with no problem" });
      })
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = ThoughtController;
