import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const OnlyLogin = ({ redirectPath = '/login' }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    // Swal.fire({
    //   icon: 'error',
    //   title: '로그인이 필요합니다.',
    //   showConfirmButton: false,
    //   timer: 1500,
    // });
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default OnlyLogin;
