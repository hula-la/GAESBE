import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../authSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RedirectPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state: any) => state.auth);

  const getToken = () => {
    if (!location.search) return;
    const token = location.search.split('=')[1];
    localStorage.setItem('accessToken', token);
  };

  useEffect(() => {
    getToken();
    dispatch(authActions.fetchUserInfoStart());
    navigate('/');
  }, [dispatch]);

  useEffect(() => {
    if (error === 600) {
      navigate('/nickname');
    }
  }, [error, navigate]);

  return (
    <div>
      <p>리다이렉트 페이지</p>
    </div>
  );
};

export default RedirectPage;
