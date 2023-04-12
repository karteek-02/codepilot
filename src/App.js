import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import "./App.css";
import { AuthContextProvider } from './context/AuthContext';
import Landing from "./components/Landing";
import Signin from './components/Signin';
import Profile from './components/Profile';

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
