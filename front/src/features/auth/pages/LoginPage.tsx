import React from 'react';
import SocialLogin from '../components/SocialLogin';

const LoginPage = () => {
  const kakao = 'kakao';
  const naver = 'naver';
  const github = 'github';
  const google = 'google';
  return (
    <div>
      <SocialLogin social={kakao} style={{ backgroundColor: '#fee500' }} />
      <SocialLogin social={naver} style={{ backgroundColor: '#03c75a' }} />
      <SocialLogin social={github} style={{ backgroundColor: '#1B1F23' }} />
      <SocialLogin social={google} style={{ backgroundColor: '#3F7EE8' }} />
    </div>
  );
};

export default LoginPage;
