import React from 'react';
import KakaoLogin from '../components/KakaoLogin';
import NaverLogin from '../components/NaverLogin';

const LoginPage = () => {
  return (
    <div>
      <KakaoLogin />
      <NaverLogin />
    </div>
  );
};

export default LoginPage;