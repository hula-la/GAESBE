import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import IntroPage from './features/Intro/pages/IntroPage'
import LoginPage from './features/auth/pages/LoginPage'
import AlgoMainPage from './features/algorithm/pages/AlgoMainPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<IntroPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="/algo/*" element={<AlgoMainPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
