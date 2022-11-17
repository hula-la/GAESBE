import React, { useEffect } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { authActions } from './features/auth/authSlice';
import './App.css';
import IntroPage from './features/Intro/pages/IntroPage';
import LoginPage from './features/auth/pages/LoginPage';
import SetNicknamePage from './features/auth/pages/SetNicknamePage';
import GamePage from './features/game/pages/GamePage';
import RedirectPage from './features/auth/pages/RedirectPage';
import CSgamePage from './features/cs/pages/CSgamePage';
import GameSelectPage from './features/game/pages/GameSelectPage';
import GameRankingPage from './features/game/pages/GameRankingPage';

import Background from './components/Layout/Background';
import MyOfficePage from './features/game/pages/MyOfficePage';
import CoinFlipPage from './features/coinflip/CoinFlipPage';
import AlgoPage from './features/algorithm/pages/AlgoPage';
import TypingPage from './features/typing/pages/TypingPage';
import CSRandomPage from './features/cs/pages/CSRandomPage';
import CSResultPage from './features/cs/pages/CSResultPage';
import CSFriendPage from './features/cs/pages/CSFriendPage';
import { useDispatch, useSelector } from 'react-redux';
import MyPage from './features/game/pages/MyPage';
import ChangeUserInfoPage from './features/game/pages/ChangeUserInfoPage';
import FriendSocket from './features/friend/pages/FriendSocket';
import OnlyNoLogin from './private/OnlyNoLogin';
import OnlyLogin from './private/OnlyLogin';
import { itemActions } from './features/game/itemSlice';
import CSResultPageTest from './features/cs/pages/CSResultPageTest'

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authActions.fetchUserInfoStart());
    dispatch(authActions.fetchAbilityStart());
    dispatch(itemActions.fetchCharacterStart());
  }, []);
  const { userInfo } = useSelector((state: any) => state.auth);

  return (
    <>
      {userInfo && <FriendSocket />}
      <BrowserRouter>
        <Routes>
          <Route path="" element={<IntroPage />} />
          <Route path="oauth2/redirect" element={<RedirectPage />} />
          <Route path="" element={<Background />}>
            <Route element={<OnlyNoLogin userInfo={userInfo} />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="nickname" element={<SetNicknamePage />} />
             
            </Route>
          </Route>
          <Route element={<OnlyLogin />}>
            <Route path="game/*" element={<GamePage />}>
              <Route path="mypage" element={<MyPage />} />
              <Route path="select" element={<GameSelectPage />} />
              <Route path="ranking" element={<GameRankingPage />} />
              <Route path="mypage/change" element={<ChangeUserInfoPage />} />
              <Route path="" element={<MyOfficePage />} />
              <Route path="typing/*" element={<TypingPage />} />
              <Route path="algo/*" element={<AlgoPage />} />
              <Route path="casino" element={<CoinFlipPage />} />
              <Route path="CS" element={<CSgamePage />} />
              <Route path="CS/random" element={<CSRandomPage />} />
              <Route path="CS/friend" element={<CSFriendPage />} />
              <Route path="CS/result" element={<CSResultPage />} />
              <Route path="CS/test" element={<CSResultPageTest/>}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
