import { useState } from 'react'
import RoleSelection from './components/RoleSelection/RoleSelection'
import GetStarted from './components/GetStarted/GetStarted'
import PollCreation from './components/PollCreation/PollCreation'
import AnswerSubmission from './components/AnswerSubmission/AnswerSubmission'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:3000', {
  transports: ['websocket'],
});

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<RoleSelection socket={socket} />}></Route>
            <Route path="/studentName" element={<GetStarted socket={socket} />}></Route>
            <Route path="/pollCreation" element={<PollCreation socket={socket} />}></Route>
            <Route path="/answerQuestion" element={<AnswerSubmission socket={socket} />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
