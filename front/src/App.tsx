import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import IntroPage from './features/Intro/pages/IntroPage'
import LoginPage from './features/auth/pages/LoginPage'
import AlgoPage from './features/algorithm/AlgoPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<IntroPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="/algo/*" element={<AlgoPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
