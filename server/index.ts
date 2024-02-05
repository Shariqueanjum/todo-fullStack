import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import connectDB from "./db/connect.js"
import userRoute from "./routes/auth.js";
import todoRoute from "./routes/todo.js";
import dotenv from "dotenv" ;


const port=3000;


dotenv.config();

const app=express();


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  exposedHeaders: ['Content-Type', 'Authorization'],

}));

app.use(express.json());

app.use("/user",userRoute);
app.use("/todo",todoRoute)

app.get("/",(req,res)=>{
  res.send("hiiii")
})

const startServer = async () => {
    try {
      if(process.env.MONGODB_URL===undefined)throw new Error();
      connectDB(process.env.MONGODB_URL);
      app.listen(port, () => console.log(`Server started on port ${port}`));
    } catch (error) {
      console.log(error);
    }
  };

  startServer();