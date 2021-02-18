 const router = require('express').Router();
 const {getAllUsers,getUserById,createUser,updateUser,delUser}=require('../../controllers/user-controller');

 
 // Set up GET all and POST at /api/user
 router
   .route('/')
   .get(getAllUsers)
   .post(createUser);
 
//  // Set up GET one, PUT, and DELETE at /api/users/:id
 router
   .route('/:id')
   .get(getUserById)
    .put(updateUser)
   .delete(delUser);
 
 module.exports = router;