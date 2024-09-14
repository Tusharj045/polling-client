import React, { useState } from 'react';
import './RoleSelection.css';
import { useNavigate } from 'react-router-dom';
import Toast from '../Toast/Toast';

const RoleSelection = ({socket}) => {
    const [selectedRole, setSelectedRole] = useState(null);
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
    };

    const selectRole = () => {
        socket.emit('register', {role: selectedRole})
    }
    
    socket.on("registered", (role) => {
        if (role == "get_student_name") {
            navigate("/studentName")
        } else if (role == "teacher") {
            navigate("/pollCreation")
        } else {
            console.log("Registered wrong role")
        }
        console.log('DATA on CLient: ', role)
    })

    socket.on("error", (data) => {
        console.log(data)
        setErrorMessage(data)
        setShowToast(true);
    })

    return (
        <div className="role-selection">
            <div className="header1">
                <img className="polling_logo" src="src\assets\poll_logo.png" alt="LOGO" />
                <h1>Welcome to the <span className="highlight">Live Polling System</span></h1>
                <p>Please select the role that best describes you to begin using the live polling system</p>
            </div>

            <div className="role-cards">
                <div 
                    className={`role-card ${selectedRole === 'student' ? 'selected' : ''}`}
                    onClick={() => handleRoleSelect('student')}
                >
                    <h2>I'm a Student</h2>
                    <p>Lorem ipsum is simply dummy text of the printing and typesetting industry</p>
                </div>
                <div 
                    className={`role-card ${selectedRole === 'teacher' ? 'selected' : ''}`}
                    onClick={() => handleRoleSelect('teacher')}
                >
                    <h2>I'm a Teacher</h2>
                    <p>Submit answers and view live poll results in real-time.</p>
                </div>
            </div>

            <img className="continue_button" onClick={selectRole} src="src\assets\continue_button.png" alt="LOGO" />
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
}

export default RoleSelection;
