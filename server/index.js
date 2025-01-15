require('dotenv').config();
const express = require('express')
const cors = require('cors');
const RunServer = require('./database/connection');
const todoROuter = require('./routes/todoRoutes');
//dont type


const app = express();
const port = 5000;

//use env
// RunServer()

app.use(express.json())
app.use(cors())

RunServer()

//app.use():this function is used to express. js to middleware functions at a specific path. middlewere functions can perform a variety of tasks, such as mordifying requests and responses or ending the requests-response cycle.

app.use('/todolist', todoROuter)

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})