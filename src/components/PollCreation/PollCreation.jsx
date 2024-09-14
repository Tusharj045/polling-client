import React, { useState } from 'react';
import './PollCreation.css';

const PollCreation = ({socket}) => {
  // State for the question text and timer value
  const [question, setQuestion] = useState('');
  const [timer, setTimer] = useState('15'); // Default timer value
  const [options, setOptions] = useState([{ text: '', isCorrect: false }]);
  
  // Add new option
  const addOption = () => {
    setOptions([...options, { text: '', isCorrect: false }]);
  };

  // Handle question input change
  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  // Handle option text change
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index].text = value;
    setOptions(newOptions);
  };

  // Handle correct option toggle
  const handleCorrectChange = (index, isCorrect) => {
    const newOptions = [...options];
    newOptions[index].isCorrect = isCorrect;
    setOptions(newOptions);
  };

  // Handle timer selection change
  const handleTimerChange = (e) => {
    setTimer(e.target.value);
  };

  const createPoll = () => {
    console.log(JSON.stringify({question, timer, options}))
    socket.emit("ask-question", {timeLimit: timer, question, options})
  }

  return (
    <div className="poll-creation">
      <div className="header1">
        <img className="polling_logo" src="src\assets\poll_logo.png" alt="LOGO" />
        <h1>Let's Get Started</h1>
        <p>You'll have the ability to create and manage polls, ask questions, and monitor your students' responses in real-time.</p>
      </div>

      <div className="question-section">
        <div className='questionTitle'>
          <label htmlFor="question">Enter your question</label>
          <select value={timer} onChange={handleTimerChange}>
            <option value="15">15 seconds</option>
            <option value="30">30 seconds</option>
            <option value="45">45 seconds</option>
            <option value="60">60 seconds</option>
          </select>
        </div>
        
        <textarea
          id="question"
          placeholder="Enter your question here"
          maxLength="100"
          value={question}
          onChange={handleQuestionChange}
        />
        <span className="char-count">{question.length}/100</span>
      </div>

      <div className="options-section">
        <label>Edit Options</label>
        {options.map((option, index) => (
          <div className="option" key={index}>
            <span className="option-index">{index + 1}</span>
            <input
              type="text"
              value={option.text}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder="Enter option"
            />
            <div className="correct-toggle">
              <span>Is it correct?</span>
              <label>
                <input
                  type="radio"
                  checked={option.isCorrect}
                  onChange={() => handleCorrectChange(index, true)}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  checked={!option.isCorrect}
                  onChange={() => handleCorrectChange(index, false)}
                />
                No
              </label>
            </div>
          </div>
        ))}
        <button className="add-option" onClick={addOption}>+ Add More options</button>
      </div>

      <div className='footer-container'>
        <div className="fixed-footer">
          <img className="continue_button" onClick ={createPoll} src="src\assets\ask_question.png" alt="LOGO" />
        </div>
      </div>
    </div>
  );
};

export default PollCreation;
