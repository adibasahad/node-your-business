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
            console.log('Sending request to:', `${process.env.REACT_APP_BACKEND_URL}/todolist/`);
            console.log('Payload:', { message });

            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/todolist/`, {
                message: message,
            });

            if (response.data.success === 'created') {
                window.location.reload();
            }
        } catch (error) {
            // Log error details to understand the issue better
            console.error('Error sending request:', error);
            if (error.response) {
                // Server responded with a status other than 200 range
                console.error('Response Error:', error.response.data);
                console.error('Response Status:', error.response.status);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Request Error:', error.request);
            } else {
                // Something went wrong while setting up the request
                console.error('Error Message:', error.message);
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
