import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface Props {
  userInfo: any;
}

export const OnlyNoLogin = ({ userInfo }: Props) => {
  if (userInfo) {
    return <Navigate to={'/game'} replace />;
  }

  return <Outlet />;
};

export default OnlyNoLogin;
