const Todo = require("../model/todo");


const createToDo = async (req, res) => {
    const { message } = req.body;

    if (req.body.message === "") {
        return res.status(401).json({ errorMessage: "Please enter a message" });
    }

    //Validation: Check if the message is not empty or does not meet the length requirement.
    if (!message || message.length < 4 || message.length > 20) {
        return res.status(400)
            .json({ errorMessage: "Message must be between 4 and 20 characters" });
    }

    try {
        const addToDO = await Todo.create({ message });
        res.status(200).json({ success: "created", data: addToDO });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "International server error" });
    }
};
const getAllToDo = async (req, res) => {
    try {
        const getToDo = await Todo.find({});
        res.status(200).json({ data: getToDo });
    } catch (error) {
        console.log(error);
    }
};

//When you see an empty {} object passed to the. find() method, it means that it is looking for all documents in the collection.
const deleteToDo = async (req, res) => {
    try {
        const deleted = await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: "deleted", data: deleted });
    } catch (error) {
        console.log(error);
    }
};
//The findByIdAndDelete() method is used to delete a document by its id.
//find a document by its _id field. 
//delete that document from the collection.
//req.params.id refers to the ID of the document you want to delete,which is passed in the URL. For example, if the route is /delete/:id, req.params.id will contain the value of the id.

//A client makes a request to an endpoint like :
//Delete/ todo/12345abcdef is the ID of the document you want to delete.

// Route handler:
//the ID (12345abcdef) gets asigned to req.params..id.

//Mongoose Operation:
//The findByIdAndDelete(req.params.id)vruns and looks for the document with _id: 12345abcdef in the MongoDB collection.

//Deletion Outcome:
//If found, the document is deleated and returned to the deleated variable.
//if not delete will be null.

const updateToDo = async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            {
                message: req.body.message
            },
            { new: true }
        );
        if (updatedTodo) {
            res.json({ success: "updated", data: updatedTodo });
        } else {
            res.status(404).json({ error: "Todo not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
//{ new: true}: this option tess Mongoos e to return the updated document instead of the original one. Without {
//new: true}, the original document is returned.
//this ensures that the newly updated version of the document is returned.

module.exports = {
    createToDo,//if you want to export all the function. then you have to use brackets.
    getAllToDo,
    updateToDo,
    deleteToDo,
};