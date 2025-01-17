import axios from 'axios';
import './Addtodo.css'
import { useState } from "react";
import { toast } from 'react-toastify';

export default function Addtodo() {
    const [message, setMessage] = useState("");

    const createTodo = async () => {
        //validate message
        if (message === "") {
            toast.error('Cannot add an empty message');
            return;
        }

        if (message.length < 4 || message.length > 20) {
            toast.error('Message should be between 4 to 20 characters');
            return;
        }

        try {
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            console.log('Backend URL:', backendUrl);

            console.log('Sending request to:', `${backendUrl}/todolist/`);
            console.log('Payload:', { message });

            const response = await axios.post(`${backendUrl}/todolist/`, {
                message: message,
            });

            if (response.data.success === 'created') {
                window.location.reload();
            }
        } catch (error) {
            console.error('Error details:', error.response ? error.response.data : error.message);
        }
    }

    return (
        <div className="container">
            {/* input for message */}
            <input
                type="text"
                placeholder="Add task here"
                onChange={(e) => setMessage(e.target.value)}
            />
            <br></br> <br></br>
            {/* add button */}
            <button onClick={createTodo} className="btn">
                Add
            </button>
        </div>
    );
}
