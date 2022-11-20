import React, { useState } from 'react';
import styled from 'styled-components';
import SocialLogin from '../components/SocialLogin';

const LoginBlock = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  .bgImg {
    position: relative;
    height: 100vh;
    width: 100%;
    filter: brightness(50%);
    /* filter: blur(3px); */
  }
  .characters {
    position: absolute;
    height: 10%;
    z-index: 10;
    top: 6%;
    left: 30%;
    display: flex;
    align-items: flex-end;
  }
  .loginBox {
    box-sizing: border-box;

    position: absolute;
    width: 40%;
    height: 70%;
    left: 30%;
    top: 15%;

    background: rgba(217, 217, 217, 0.7);
    border: 7px solid #000000;
    box-shadow: 10px 10px 4px #000000;
    border-radius: 20px;

    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .textBox {
    height: 25%;
    margin-top: 3rem;
  }
  .title {
    font-size: 1rem;
    color: #6f43ff;
    text-shadow: 2px 2px #ffffff;
  }
  .content {
    font-size: 5rem;
    color: #6f43ff;
    text-shadow: 4px 5px #ffffff;
    font-weight: bold;
  }
  .buttons {
    /* margin-top: 5%; */
    width: 50%;
  }
`;

const LoginPage = () => {
  const kakao = 'kakao';
  const naver = 'naver';
  const github = 'github';
  const google = 'google';

  const [characterIdx, setCharacterIdx] = useState<any>([
    0, 1, 2, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
    23, 24,
  ]);
  return (
    <LoginBlock>
      <img src="/img/Intro/introBg.gif" alt="bgImg" className="bgImg" />
      <div className="characters">
        <img
          style={{ height: '100%' }}
          src={`${process.env.REACT_APP_S3_URL}/profile/${characterIdx[0]}_walk.gif`}
        />
        <img
          style={{ height: '100%' }}
          src={`${process.env.REACT_APP_S3_URL}/profile/${characterIdx[1]}_walk.gif`}
        />
        <img
          style={{ height: '100%' }}
          src={`${process.env.REACT_APP_S3_URL}/profile/${characterIdx[2]}_walk.gif`}
        />
      </div>
      <div className="loginBox">
        {/* <img
          className="content"
          src="/img/login/loginContent.png"
          alt="loginContent"
        /> */}
        <div className="textBox">
          <div className="title">환영합니다!</div>
          <div className="content">개츠비</div>
        </div>
        <div className="buttons">
          <SocialLogin social={kakao} style={{ backgroundColor: '#fee500' }} />
          <SocialLogin social={naver} style={{ backgroundColor: '#03c75a' }} />
          <SocialLogin social={github} style={{ backgroundColor: '#1B1F23' }} />
          <SocialLogin social={google} style={{ backgroundColor: '#3F7EE8' }} />
        </div>
      </div>
    </LoginBlock>
  );
};

export default LoginPage;
