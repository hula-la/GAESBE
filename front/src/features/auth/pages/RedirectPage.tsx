import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../authSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RedirectPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, userInfo } = useSelector((state: any) => state.auth);

  const getToken = () => {
    if (!location.search) return;
    const token = location.search.split('=')[1];
    localStorage.setItem('accessToken', token);
  };

  useEffect(() => {
    getToken();
    dispatch(authActions.fetchUserInfoStart());
  }, [dispatch]);

  useEffect(() => {
    if (error === 499) {
      dispatch(authActions.setError());
      navigate('/nickname');
    }
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo, error, navigate]);

  return (
    <div>
      <p></p>
    </div>
  );
};

export default RedirectPage;
