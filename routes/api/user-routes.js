const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  delUser,
  confirmFriend,
  unconfirmFriend,
} = require("../../controllers/user-controller");

// Set up GET all and POST at /api/user
router.route("/").get(getAllUsers).post(createUser);

//  // Set up GET one, PUT, and DELETE at /api/users/:id
router.route("/:userId").get(getUserById).put(updateUser).delete(delUser);

router
  .route("/:userId/friends/:friendId")
  .post(confirmFriend)
  .delete(unconfirmFriend);

module.exports = router;
