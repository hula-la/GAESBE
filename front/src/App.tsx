import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import IntroPage from './features/Intro/pages/IntroPage';
import LoginPage from './features/auth/pages/LoginPage';
import SetNicknamePage from './features/auth/pages/SetNicknamePage';
import CombinePage from './features/game/pages/CombinePage';
import RedirectPage from './features/auth/pages/RedirectPage';
import CSgamePage from './features/cs/pages/CSgamePage';

import Background from './components/Layout/Background';
import MyOfficePage from './features/game/pages/MyOfficePage';
import CoinFlipPage from './features/coinflip/CoinFlipPage';
import AlgoPage from './features/algorithm/AlgoPage';
import TypingPage from './features/typing/pages/TypingPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<IntroPage />} />
        <Route path="oauth2/redirect" element={<RedirectPage />} />
        <Route path="" element={<Background />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="nickname" element={<SetNicknamePage />} />
        </Route>
        <Route path="game/*" element={<CombinePage />}>
          <Route path="home" element={<MyOfficePage />} />
          <Route path="typing/*" element={<TypingPage />} />
          <Route path="algo/*" element={<AlgoPage />} />
          <Route path="casino" element={<CoinFlipPage />} />
          <Route path="CS" element={<CSgamePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
