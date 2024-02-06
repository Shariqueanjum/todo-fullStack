import express from "express";
import {authenticateJwt} from "../middleware/index.js";
import Todo from "../db/models/todo.js";
import {z} from "zod";

const inputProps=z.object({
    title:z.string().min(1),
    description:z.string().min(1)
})

const router=express.Router();


router.post('/todos', authenticateJwt, async(req, res) => {
    try {
        
        const pardedInput=inputProps.safeParse(req.body);
        if(!pardedInput.success)return res.status(411).json({msg:pardedInput.error})
      
          const { title,description } = pardedInput.data;

        
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
  