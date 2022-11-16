import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import { friendActions } from '../friendSlice';
import styled from 'styled-components';
import '../../../components/Common/retroBtn.css';

const Wrapper = styled.div`
  border: 5px solid #000;
  background-color: #d4d4d4;
  border-radius: 20px;
  color: #000;
  position: relative;
  height: 40%;
  font-family: NeoDunggeunmo;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .content {
    margin: auto 10%;
  }
  h1 {
    margin-bottom: 13%;
  }
  .label {
    margin: 6% 0;
  }
  .btn-div {
    position: absolute;
    top: 120%;
    left: 50%;
    transform: translate(-50%, 0);
  }
  button {
    font-weight: 700;
    font-size: 15px;
    font-family: NeoDunggeunmo;
    border: 3px solid #000;
    padding: 10px;
  }
  #nickname {
    border: none;
    width: 50%;
    height: 30px;
  }
  input[type='text'] {
    font-size: 1.5rem;
    text-align: center;
  }
  .img-btn{
    position: absolute;
    width: 100%;
    top: 165%;
    left: 50%;
    transform: translate(-50%, 0);
    img{
      width: 30%;
      margin: 0 8%;
    }
  }
`;

function RequestToYou() {
  const dispatch = useDispatch();
  const [form, setForm] = useState<string>('');
  const { isSuccess } = useSelector((state: any) => state.friend);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (form) {
      dispatch(friendActions.requestFriendStart(form));
    } else {
      Swal.fire({ icon: 'error', text: '닉네임을 입력해주세요' });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setForm('');
      dispatch(friendActions.setIsSuccess(false));
    }
  }, [isSuccess]);

  const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
    setForm(e.currentTarget.value);
  };

  return (
    <Wrapper>
      <div className="content">
        <h1>친구 신청</h1>
        <form onSubmit={handleSubmit}>
          <div className="label">
            <label htmlFor="nickname">친구의 닉네임을 입력하세요!</label>
          </div>
          입력 :{' '}
          <input
            type="text"
            name="nickname"
            id="nickname"
            onChange={handleChangeInput}
            value={form}
            autoFocus
          />
          <div className="btn-div">
            <button className="eightbit-btn--proceed">친구 요청</button>
          </div>
        </form>
      </div>
      <div className='img-btn'>
        <img src='/img/gameButton1.png'></img>
        <img src='/img/gameButton3.png'></img>
      </div>
    </Wrapper>
  );
}
export default RequestToYou;
