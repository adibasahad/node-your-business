import { AiOutlineDeleteColumn } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import './Todolist.css'


const Todolist = () => {
    const [todos, setTodos] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTodo, setCurrentTodo] = useState({ _id: null, message: '' });

    const getAllTodos = async () => {
        try {
            const response = await axios.get('http://localhost:5000/todolist/getall');
            setTodos(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getAllTodos();
    }, []);

    //the effect hook is an essential part of this react component. It is used to perform side effects i  functional components, such as fetching data, subscribing to events, or normally updating the DOM.

    //in the componenet, the useEffectr is used to fetch the initial list of to-dos from the backend when the component is first rendered.

    //in this cas getAllTOdos() is called inside this function to fetch the list of to-dos.

    //the empty array([]) is the dependency array.
    //it specifies when the effect should re-run:
    //An empty array means the effect will run only once after the enetial render of the component.
    //If dependencies are added (e.g.,[todos]), the effect will run every time those dependenceis change.

    const handleDelete = async (id) => {
        try {
            const result = await axios.delete(`http://localhost:5000/todolist/deleteToDo/${id}`);
            if (result.data.success === 'deleted') {
                toast.success('Todo deleted successfully!')
                getAllTodos()
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete todo');
        }
    };
    const handleEditInputChange = (e) => {
        setCurrentTodo({ ...currentTodo, message: e.target.value });
    };

    //{...currentTodo} means "create a new object and copy all properteis of contentTodo to it"

    const handleEdit = (todo) => {
        setIsEditing(true);
        setCurrentTodo({ _id: todo._id, message:todo.message });
    };

    const handleUpdate = async () => {
        //validate the message before updating
        if (currentTodo.message.length < 4 || currentTodo.message.length > 20) {
            toast.error('message must be between 4 and 20 charecters');
            return;//Block the update validation fails
        }
        try {
            const result = await axios.put(`http://localhost:5000/todolist/updateToDo/${currentTodo._id}`, {
                message: currentTodo.message
            });
            if (result.data.success === 'updated') {

                toast.success(`Todo updated successfully!!`);
                getAllTodos();
                setIsEditing(false);
                setCurrentTodo({ _id: null, message: '' });
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to update todo');
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setCurrentTodo({ _id: null, message: '' });
    };
    return (
        <div>
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={currentTodo.message}
                        onChange={handleEditInputChange}
                    />
                    <button onClick={handleUpdate}>Update</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                </div>
            ) : (
                <ul>
                    {todos.map((todo) => (
                        <li key={todo._id}>
                            {todo.message}
                            <AiFillEdit className="icon" onClick={() => handleEdit(todo)} />

                            <AiOutlineDeleteColumn className="icon" onClick={() => handleDelete(todo._id)} />
                        </li>

                    ))}
                </ul>
            )}
        </div>
    );
};

export default Todolist;
