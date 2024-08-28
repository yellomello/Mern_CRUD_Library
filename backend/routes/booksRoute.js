import express from 'express';
import {Book} from '../models/bookModel.js';


const router= express.Router();



  //POST ALL BOOKS
router.post("/", async (request, response) => {
    try {
      if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ) {
        return response
          .status(400)
          .send({ message: "Send all required fields." });
      }
      const newBook = {
        title: request.body.title,
        author: request.body.author,
        publishYear: request.body.publishYear,
      };
  
      const book = await Book.create(newBook);
      return response
        .status(200)
        .send({ message: "Book created succcessfully!" });
    } catch (e) {
      console.log(e);
      response.status(500).send({ message: error.message });
    }
  });
  
  //GET ALL BOOKS
  router.get("/", async(request,response)=>{
    try{
      const books =await Book.find({});
      return response.status(200).json({
        count: books.length,
        data:books,
      });
  
    }
    catch (e) {
      console.log(e);
      response.status(500).send({ message: error.message });
    }
  });
  
  //GET ONE BOOK BY ID
  router.get("/:id", async(request,response)=>{
    try{
      const {id} = request.params;
      const book = await Book.findById(id);
  
      return response.status(200).json({book});
  
    }
    catch (e) {
      console.log(e);
      response.status(500).send({ message: error.message });
    }
  });
  
  //UPDATE A BOOK
  router.put("/:id", async(request, response)=>{
    try{
      if(
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ) {
        return response.status(400).send({message: "Send all required files please!"})
      }
    
    const {id} = request.params;
    const result = await Book.findByIdAndUpdate(id,request.body);
  
    if(!result){
      return response.status(404).json({message:'book not found'});
    }
    
    return response.status(200).send({message: "Book updated successfully"});
  
  
  
  
  
  
  
    }
    catch(error){
      console.log(error);
      return response.status(500).send({message: error});
  
    }
  
  })
  
  //DELETE A BOOK
  router.delete("/:id", async(request, response)=>{
    try{
    const {id} = request.params;
    const result = await Book.findByIdAndDelete(id);
  
    if(!result){
      return response.status(404).json({message:'book not found'});
    }
    
    return response.status(200).send({message: "Book Deleted successfully"});
  
  
  
  
  
    }
    catch(error){
      console.log(error.message)
      return response.status(500).send({message: error.message});
    }
  }
  )
  

  export default router;

  