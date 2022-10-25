import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  .kakao {
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
    background-color: #fee500;
    color: #000000 85%;
    margin: 0 auto;
    cursor: pointer;
  }
  .kakaologo {
    height: 2.5rem;
    width: auto;
  }
`;

const KakaoLogin = () => {
  const location = useLocation();

  const {Kakao} = (window as any);
  const loginWithKakao = () => {
    Kakao.Auth.authorize({
      redirectUri: 'http://localhost:3000/login'
    })
  }
  const getKakaoToken = () => {
    if (!location.search) return 
    const token:string = location.search.split('=')[1]
    
  }

  useEffect(() => {
    getKakaoToken()
  }, [])

  return (
    <Wrapper>
      <button onClick={loginWithKakao} className="kakao">
        <img src="/img/login/kakao.png" alt="kakao" className="kakaologo" />
        Login with Kakao
      </button>
    </Wrapper>
  );
};

export default KakaoLogin;