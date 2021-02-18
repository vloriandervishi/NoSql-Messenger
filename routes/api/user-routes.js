 const router = require('express').Router();
 const {getAllUsers,getUserById}=require('../../controllers');

 }
 // Set up GET all and POST at /api/pizzas
 router
   .route('/')
   .get(getAllUsers)
   .post();
 
//  // Set up GET one, PUT, and DELETE at /api/pizzas/:id
 router
   .route('/:id')
   .get(getUserById)
  //  .put()
  //  .delete();
 
 module.exports = router;