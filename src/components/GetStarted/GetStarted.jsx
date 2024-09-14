import React, { useState } from 'react';
import './GetStarted.css';
import { useNavigate } from 'react-router-dom';
import Toast from '../Toast/Toast';


const GetStarted = ({socket}) => {
    const [name, setName] = useState('');
    
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    socket.on("error", (data) => {
        console.log(data)
        setErrorMessage(data)
        setShowToast(true);
    })

    const handleInputChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = () => {
        // Add submit logic here
        console.log('Name submitted:', name);
        socket.emit('register', {role: 'student', name})
    };

    socket.on("registered", (role) => {
        if (role == "student") {
            navigate("/answerQuestion")
        }
        console.log('DATA on CLient: ', role)
    })

    return (
        <div className="get-started">
            <div className="header1">
                <div>
                    <img className="polling_logo" src="src/assets/poll_logo.png" alt="LOGO" />

                </div>
                <div>
                <h1>Let's <span className="highlight">Get Started</span></h1>

                </div>
                <p>If you’re a student, you’ll be able to submit your answers, participate in live polls, and see how your responses compare with your classmates.</p>
            </div>

            <div className="input-container">
                <label htmlFor="name">Enter your Name</label>
                <input 
                    type="text" 
                    id="name" 
                    value={name} 
                    onChange={handleInputChange} 
                    placeholder="Enter your Name"
                />
            </div>

            <img onClick={handleSubmit} className="continue_button" src="src\assets\continue_button.png" alt="LOGO" />
            {showToast && (
                <Toast 
                message={errorMessage} 
                type="error" // Can be 'success', 'info', 'warning', or 'error'
                duration={3000} // Toast will disappear after 3 seconds
                onClose={() => setShowToast(false)} 
                />
            )}
        </div>
    );
};

export default GetStarted;
