import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authActions } from '../authSlice';

const SetNicknamePage = () => {
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState('');
  const { isDuplicate } = useSelector((state: any) => state.auth);

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    dispatch(authActions.checkNicknameStart(e.target.value));
  };
  const onClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(authActions.createUserInfoStart({ nickname, profileChar: 0 }));
  };

  return (
    <div>
      <p>닉네임 변경 페이지</p>
      <input onChange={onChangeNickname} />
      {isDuplicate && <p>중복된 닉네임입니다.</p>}
      <button onClick={onClickHandler}>닉네임 변경</button>
    </div>
  );
};

export default SetNicknamePage;
