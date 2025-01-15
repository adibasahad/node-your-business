const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 20
        },
    })
    const Todo = mongoose.model('Todo', todoSchema)
    module.exports = Todo
    