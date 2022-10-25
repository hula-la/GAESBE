import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import IntroPage from './features/Intro/pages/IntroPage'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<IntroPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
