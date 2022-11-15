import { useEffect, useState } from "react"
import { useSelector } from 'react-redux';

import {resultCodeRequest} from '../../../api/algoApi'

interface ResultCodeInterface {
  code: string
  lan: number
  userId: number
}

function AlgoDetailInfo({algoDetailRoomCode}:any) {
  const language: any = {
    1001: 'c++',
    1002: 'java',
    1003: 'python',
    1004: 'c',
  };
  const {userInfo} = useSelector((state:any)=>state.auth)
  const [resultCodes, setResultCodes] = useState<ResultCodeInterface[]>()
  useEffect(() => {
    fetchResultCodeRequest()
  }, [])
  const fetchResultCodeRequest = async () => {
    try {
      const res = await resultCodeRequest(algoDetailRoomCode)
      if (res.status===200) {
        setResultCodes(res.data)
        console.log(res)
      }
    } catch (error) {
      alert('배틀의 상세 결과를 가져오는데 오류가 발생했습니다')
    }
  }
  return <>
    <h1>알고리즘 배틀 코드 리뷰</h1>
    {resultCodes?.map((code:ResultCodeInterface)=> {
      if (code.userId===userInfo.id) {
        return <>
          <p>나의 코드</p>
          <p>제출 언어 : {language[code.lan]}</p>
          <p>{code.code}</p>
        </>
      } else {
        return <>
          <p>누군가의 코드</p>
          <p>제출 언어 : {language[code.lan]}</p>
          <p>{code.code}</p>
        </>
      }
    })}
  </>
}
export default AlgoDetailInfo