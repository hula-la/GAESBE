import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { resultCodeRequest } from '../../../../api/algoApi';

import Swal from 'sweetalert2';

const Wrapper = styled.div`
  .title{
    border: 1px solid #000;

  }
  .item{
    border: 1px solid #000;
  }
`

const Close = styled.img`
  /* z-index: 5000; */
  position: absolute;
  right: 10%;
  
`;

interface ResultCodeInterface {
  code: string;
  lan: number;
  userId: number;
}
interface Props {
  handleModal: () => void;
  algoDetailRoomCode: any;
}
function AlgoDetailInfo({ handleModal, algoDetailRoomCode }: Props) {
  const language: any = {
    1001: 'c++',
    1002: 'java',
    1003: 'python',
    1004: 'c',
  };
  const { userInfo } = useSelector((state: any) => state.auth);
  const [resultCodes, setResultCodes] = useState<ResultCodeInterface[]>();
  const [codeId, setCodeId] = useState(0);
  useEffect(() => {
    fetchResultCodeRequest();
  }, []);
  useEffect(() => {
    if (resultCodes) {
      console.log(resultCodes);
    }
  }, [resultCodes]);
  const fetchResultCodeRequest = async () => {
    try {
      const res = await resultCodeRequest(algoDetailRoomCode);
      console.log(res);
      if (res.status === 200) {
        setResultCodes(res.data);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: '배틀의 상세 결과를 가져오는데 오류가 발생했습니다',
      });
    }
  };

  const clickCode = (idx:any) => {
    setCodeId(idx);
  };

  return (
    <Wrapper>
      <Close onClick={handleModal} src="/img/close.png" alt="asdfasdf" />
      <h1 className='title'>알고리즘 배틀 코드 리뷰</h1>
      <div>
      {resultCodes?.map((code: ResultCodeInterface, index) => {

            if (code.userId === userInfo.id) {
              return (
                <div className='item' key={index} onClick={clickCode}>
                  <p>나의 코드</p>
                </div>
              );
            } else {
              return (
                <div className='item' key={index} onClick={clickCode}>
                  <p>누군가의 코드</p>
                </div>
              );
            }

          })}

      </div>
      <div>
        {resultCodes && resultCodes[codeId].userId}
      </div>
      {resultCodes?.map((code: ResultCodeInterface, index) => {
        if (code.userId === userInfo.id) {
          return (
            <div className='item' key={index}>
              <p>나의 코드</p>
              <p>제출 언어 : {language[code.lan]}</p>
              <p>{code.code}</p>
            </div>
          );
        } else {
          return (
            <div className='item' key={index}>
              <p>누군가의 코드</p>
              <p>제출 언어 : {language[code.lan]}</p>
              <p>{code.code}</p>
            </div>
          );
        }
      })}
    </Wrapper>
  );
}
export default AlgoDetailInfo;
