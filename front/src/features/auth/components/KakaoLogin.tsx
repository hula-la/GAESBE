import React from 'react';
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
  const redirectURI = 'http://localhost:3000/oauth2/redirect';
  // const KAKAO_AUTH_URL = `https://k7e104.p.ssafy.io:8081/api/oauth2/authorize/google?redirect_uri=${redirectURI}`;
  const KAKAO_AUTH_URL = `http://localhost:8080/api/oauth2/authorize/kakao?redirect_uri=${redirectURI}`;
  const loginWithKakao = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

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
