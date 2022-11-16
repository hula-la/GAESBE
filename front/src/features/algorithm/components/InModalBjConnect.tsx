import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import Swal from 'sweetalert2';

import { BjConnectCodeRequest } from '../../../api/algoApi';
import { algoActions } from '../algorithmSlice';

import LoadingSpinner from './LoadingSpinner';

function InModalBjConnect() {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state: any) => state.auth);
  const { loadingMsg } = useSelector((state: any) => state.algo);

  const [bjIdForm, setBjIdForm] = useState<string>('');
  const [connectCode, setConnectCode] = useState<string>('');

  useEffect(() => {
    setBjIdForm(userInfo.bjId);
  }, []);

  const handleCodeRequest = async () => {
    try {
      const res = await BjConnectCodeRequest();
      if (res.status === 200) {
        setConnectCode(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckBjConnect = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      bjId: { value: string };
    };
    const bjId = target.bjId.value;
    if (bjId) {
      dispatch(algoActions.bjConnectRequestStart(bjId));
    } else {
      Swal.fire({ icon: 'error', text: '백준 아이디를 입력해주세요' });
    }
  };

  const handleCopyCode = (value: string) => {
    const tmp = document.createElement('input');
    document.body.appendChild(tmp);
    tmp.value = value;
    tmp.select();
    document.execCommand('copy');
    document.body.removeChild(tmp);
    Swal.fire({ icon: 'success', text: '복사되었습니다' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBjIdForm(e.currentTarget.value);
  };

  return (
    <>
      <h1>백준 연동하기 페이지</h1>
      {userInfo.bjId && <h2>백준 아이디가 연결되어 있습니다</h2>}
      {loadingMsg === 'BJCONNECT' && (
        <LoadingSpinner loadingMsg={'연동 확인중입니다'} />
      )}
      <button onClick={handleCodeRequest}>연동코드 받기</button>
      {connectCode && (
        <>
          <h3>{connectCode}</h3>{' '}
          <button
            onClick={() => {
              handleCopyCode(connectCode);
            }}
          >
            코드복사하기
          </button>
        </>
      )}
      <form onSubmit={handleCheckBjConnect}>
        <label htmlFor="bjId">나의 백준아이디</label>
        <input
          type="text"
          name="bjId"
          id="bjId"
          value={bjIdForm}
          onChange={handleInputChange}
        />
        <button>연동하기</button>
      </form>
    </>
  );
}
export default InModalBjConnect;
