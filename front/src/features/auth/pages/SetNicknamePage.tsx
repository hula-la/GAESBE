import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../authSlice';
import Swal from 'sweetalert2';

const SetNicknamePage = () => {
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState('');
  const { isDuplicate } = useSelector((state: any) => state.auth);
  const [lengthOutOfRange, setLengthOutOfRange] = useState<boolean>(false);

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 2 || e.target.value.length > 8) {
      setLengthOutOfRange(true);
    } else {
      setLengthOutOfRange(false);
    }
    setNickname(e.target.value);
    dispatch(authActions.checkNicknameStart(e.target.value));
  };
  const onClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    if (isDuplicate || lengthOutOfRange) {
      Swal.fire({
        icon: 'error',
        text: '닉네임이 중복되거나 글자수 제한에 맞지 않습니다',
      });
      return;
    }
    dispatch(authActions.createUserInfoStart({ nickname, profileChar: 0 }));
  };

  return (
    <div>
      <p>닉네임 변경 페이지</p>
      <input onChange={onChangeNickname} />
      {isDuplicate && <p>중복된 닉네임입니다.</p>}
      {lengthOutOfRange && <p>닉네임은 2~6글자만 가능합니다</p>}
      <button onClick={onClickHandler}>닉네임 변경</button>
    </div>
  );
};

export default SetNicknamePage;
