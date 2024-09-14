import React, { useState, useEffect } from 'react';
import './AnswerSubmission.css';

const AnswerSubmission = ({socket}) => {
  const [timeLeft, setTimeLeft] = useState(15); // Set initial timer (15 seconds)
  const [selectedOption, setSelectedOption] = useState(null);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);

  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [currentVotes, setCurrentVotes] = useState([]);
  const [totalAnswerSubmitted, setToalAnswerSubmitted] = useState(0)

  socket.on('new-question', (question) => {
    setAnswerSubmitted(false)
    console.log("question", question)
    setTimeLeft(question.timeLimit)
    setQuestion(question.text)
    setOptions(question.options)
  });

  const submitAnswer = () => {
    socket.emit('submit-answer', options[selectedOption])
    console.log(selectedOption);
    setAnswerSubmitted(true)
  }
  // Timer logic
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  socket.on('update-votes', (currentVotes) => {
    console.log("currentVotes", currentVotes)
    setCurrentVotes(currentVotes);
    const total = Object.values(currentVotes).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    setToalAnswerSubmitted(total)
  })
  // Handle option selection
  const handleOptionSelect = (index) => {
    setSelectedOption(index);
  };
  const percentage = 60;
  return (
    <div className="answer-submission">
      {question === ''? <div className='noQuestion'>
        <div className="header1">
          <img className="polling_logo" src="src\assets\poll_logo.png" alt="LOGO" />
          <img className="ellipse" src="src\assets\Ellipse.png" alt="LOGO" />
          <p>Wait for the teacher to ask questions..</p>
        </div>
        </div>:
          <div className='newQuestioncontainer'>
            <div className="header">
              <h2>Question 1 <span className="timer">⏱ {timeLeft}</span></h2>
            </div>
            <div className='question-container'>
                <div className="question-bar">
                    <p>{question}</p>
                </div>

                <div className="options1">
                    {options.map((option, index) => (
                    <div
                        key={index}
                        className={`option1 ${selectedOption === index ? 'selected' : ''}`}
                        
                        style={answerSubmitted
                          ? {
                              background: `linear-gradient(90deg, #6766D5 ${(currentVotes[option] * 100) / totalAnswerSubmitted }%, transparent ${(currentVotes[option] * 100) / totalAnswerSubmitted }%)`
                            }
                          : {}}
                        onClick={() => handleOptionSelect(index)}
                    >
                        <span className="option-index">{index + 1}</span>
                        {option}
                    </div>
                    ))}
                </div>
            </div>
            { !answerSubmitted ? <img className="submit-button" onClick={submitAnswer} src="src\assets\submit.png" alt="LOGO" />: 
            <h2 style={{paddingTop: '10px'}}> Wait for the teacher to ask a new question.. </h2> }
            
          </div>
          
              }
      <div className="chat-icon">
        <img className="polling_logo" src="src\assets\chat-icon.png" alt="LOGO" />
      </div>
    </div>
  );
};

export default AnswerSubmission;
