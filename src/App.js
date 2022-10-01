import './App.css';
import { Navbar } from "./Components/Navbar";
import { Home } from "./Components/Home";
import { About } from "./Components/About";
import { Login } from "./Components/Login";
import { Signup } from "./Components/Signup";
import NoteState from "./context/notes/NoteState";
import Alert from './Components/Alert';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useState } from 'react';

function App() {
  const [mode, setMode] = useState('light'); // Whether dark mode is enabled or not
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 2000);
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert}/>} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login showAlert={showAlert}/>} />
              <Route path="/signup" element={<Signup showAlert={showAlert}/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;