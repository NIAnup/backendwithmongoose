const express = require('express');
const app = express();
const path = require('mongoose');
const User= require('./model/user');

app.use(express.json());

app.post('/register',(req,res)=>{
    res.send('hello world');
})

express().listen("3000",()=>{
    console.log('Server is running on port 3000');
});

