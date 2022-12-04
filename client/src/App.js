import React, { createContext, useReducer } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "./App.css";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import Logout from './components/Logout';
import ErrorPage from './components/ErrorPage';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


import {initialState, reducer} from "../src/reducer/UseReducer";
export const UserContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <UserContext.Provider value={{state, dispatch}}>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/logout" element={<Logout />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </>
  )

}

export default App
