 const router = require('express').Router();
 const {getAllUsers,getUserById,createUser,updateUser,delUser}=require('../../controllers');

 }
 // Set up GET all and POST at /api/pizzas
 router
   .route('/')
   .get(getAllUsers)
   .post(createUser);
 
//  // Set up GET one, PUT, and DELETE at /api/pizzas/:id
 router
   .route('/:id')
   .get(getUserById)
    .put(updateUser)
   .delete(delUser);
 
 module.exports = router;