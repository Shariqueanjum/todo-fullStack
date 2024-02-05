import express from "express";


import {authenticateJwt} from "../middleware/index.js";
import Todo from "../db/models/todo.js";

const router=express.Router();


router.post('/todos', authenticateJwt, async(req, res) => {
    try {
        const { title, description } = req.body;
        const done = false;
        const userId = req.headers["userId"];
      
        const newTodo = await new Todo({ title, description, done, userId });
      
        await newTodo.save();
        if(newTodo)res.status(201).json( newTodo)  ;
        else res.status(500).json( {msg:"something went wrong"})  
          
    } 
    catch (e) {
        console.log(e)
        res.status(500).json({msg:"internal server error"})
    }

     
  });


  router.get('/todos', authenticateJwt, async(req, res) => {
    try {
        const userId = req.headers["userId"];
  
        const data=await Todo.find({userId});
        if(data){
            res.status(200).json(data);
        }
        else{
            res.status(500).json({msg:"something went wrong"})
        }     
    } 
    catch (e) {
        console.log(e)
        res.status(500).json({msg:"Something went wrong"})
    }

  });


  router.patch('/todos/:todoId/done', authenticateJwt, async(req, res) => {
    try {
        const { todoId } = req.params;
        const userId = req.headers["userId"];
        const data=await Todo.findOneAndUpdate({ _id: todoId, userId }, { done: true }, { new: true })
            if(data)res.status(200).json(data);
            else res.status(500).json({msg:"something went wrong"})  
    } 
    catch (e) {
        console.log(e);
       res.status(500).json({msg:"something went wrong"}) 
    }
    

  });

  
  
  export default router;
  