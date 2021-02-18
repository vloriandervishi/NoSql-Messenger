 const router =require('express').Router();
 const {getAllThoughts,getThoughtById,createThought,updateThought,delThought}=require('../../controllers/thought-controller');

 
 // Set up GET all and POST at /api/user
 router
   .route('/')
   .get(getAllThoughts)
   .post(createThought);
 
//  // Set up GET one, PUT, and DELETE at /api/Thoughts/:id
 router
   .route('/:id')
   .get(getThoughtById)
    .put(updateThought)
   .delete(delThought);
 module.exports=router;