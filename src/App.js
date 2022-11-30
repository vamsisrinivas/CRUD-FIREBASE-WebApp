import React from "react"
import './App.css';
import Edit from "./Edit";
import Home from './Home';
import {Route,Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route exact path="/"  element={<Home/>}/>
          <Route path="/edit"  element={<Edit/>}/>
        </Routes>
    </div>
  );
}

export default App;
