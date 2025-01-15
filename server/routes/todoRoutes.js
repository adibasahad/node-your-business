const express = require('express')
const { getAllToDo, createToDo, updateToDo, deleteToDo } = require('../controllers/todoctrl')


const todoROuter = express.Router()

//get-> read
//post-> create/send
//put-> update
//delete-> delete

//http://localhost:3000/getall'
todoROuter.get('/getall', getAllToDo)
todoROuter.post('/', createToDo)
todoROuter.put('/updateToDo/:id', updateToDo)
todoROuter.delete('/deleteToDo/:id', deleteToDo)

module.exports = todoROuter