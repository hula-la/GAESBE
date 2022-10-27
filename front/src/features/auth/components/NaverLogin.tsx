import React, { useEffect } from 'react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  #naverIdLogin {
    display: none;
  }

  .naver {
    padding: 0.6em 1em;
    border-radius: 0.25em;
    border: none;
    font-size: 1rem;
    margin-top: 0.7em;
    display: flex;
    width: 60%;
    height: 3rem;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    box-shadow: var(--shadow-1);
    @media only screen and (min-device-width: 375px) and (max-device-width: 479px) {
      box-shadow: 2px 2px 2px #4646466b;
    }
    background-color: #03c75a;
    color: white;
    margin: 0 auto;
    cursor: pointer;
  }
  .naverlogo {
    height: 2.5rem;
    width: auto;
  }
`;

const NaverLogin = () => {
  const { naver } = window as any;
  const naverRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const NAVER_CLIENT_ID = `${process.env.REACT_APP_NAVER_CLIENT_ID}`;
  const NAVER_CALLBACK_URL = 'http://localhost:3000/login';

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      callbackUrl: NAVER_CALLBACK_URL,
      isPopup: false,
      loginButton: { color: 'green', type: 3, height: 58 },
      callbackHandle: true,
    });
    naverLogin.init();
  };

  const getNaverToken = () => {
    if (!location.hash) return;
    const token = location.hash.split('=')[1].split('&')[0];
    console.log(token);
  };

  useEffect(() => {
    initializeNaverLogin();
    getNaverToken();
  }, []);

  const handleClick = () => {
    console.log(naverRef.current?.children);
    if (naverRef.current?.children[0] instanceof HTMLElement) {
      naverRef.current?.children[0].click();
    }
  };

  return (
    <Wrapper>
      <div ref={naverRef} id="naverIdLogin" />
      <button onClick={handleClick} className="naver">
        <img src="/img/login/naver.png" alt="naver" className="naverlogo" />
        Login with Naver
      </button>
    </Wrapper>
  );
};

export default NaverLogin;
