const express = require('express');
const app = express();
const path = require('mongoose');
const User= require('./model/user');
const cookieParser = require('cookie-parser');

app.use(express.json({limit:'16kb'}));
app.use(express.urlencoded({extended:true,limit:'16kb'}));
app.use(express.static('public'))
app.use(cookieParser());



//router import

import userRouter from './routes/user.routes.js';





// route declaration
app.use('/api/v1/users',userRouter)



export{app}
