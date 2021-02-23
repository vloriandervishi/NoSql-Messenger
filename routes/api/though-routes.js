const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  delThought,
  affirmReaction,
  negateReaction,
} = require("../../controllers/thought-controller");

// Set up GET all and POST at /api/user
router.route("/").get(getAllThoughts).post(createThought);

//  // Set up GET one, PUT, and DELETE at /api/Thoughts/:id
router
  .route("/:thoughtId")
  .get(getThoughtById)
  .put(updateThought)
  .delete(delThought);

router.route("/:thoughtId/reactions").post(affirmReaction);
router.route("/:thoughtId/reactions/:reactionId").delete(negateReaction);
module.exports = router;
