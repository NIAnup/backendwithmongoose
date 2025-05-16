import dotenv from "dotenv";
import app from "./app.js";

dotenv.config({
    path:'./env'
})

express().listen("3000",()=>{
    console.log('Server is running on port 3000');
});