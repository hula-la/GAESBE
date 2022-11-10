import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { ProblemInterface } from '../../../models/algo'
import { algoActions } from '../algorithmSlice'

import ProblemInfo from './ProblemInfo'
import BeforeSolveUsers from './BeforeSolveUsers'

interface LanguageInterface {
  lanId: number
  name: string
}


function AlgoSolve({client, problemList, inGameUsers, ranking, problemIndex}: any ) {
  const dispatch = useDispatch()

  const languageList: LanguageInterface[] = [{lanId: 1001, name: 'c++'},{lanId: 1002, name: 'java'}, {lanId: 1003, name : 'python'}, {lanId: 1004, name : 'c'}]
  const nowProblem: ProblemInterface = problemList[problemIndex]
  const {InGameInfo, solve} = useSelector((state:any) => state.algo)
  const {userInfo} = useSelector((state:any)=>state.auth)
  const [form, setForm] = useState<{lanId: number, code: string}>({lanId: 1003, code:''})

  useEffect(() => {
    return () => {
      dispatch(algoActions.solveSuccess(false))
    }
  }, [])


  const handleRadio = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      lanId: Number(e.currentTarget.value)
    })
  }
  const handleCode = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm({
      ...form,
      code: e.currentTarget.value
    })
  }
  // TextArea에서 ctrl + a가 안되서 만듦
  const codeTextArea = useRef<HTMLTextAreaElement>(null)
  codeTextArea.current?.addEventListener("keydown", keysPressed);
  function keysPressed(e:any) {
    if (e.ctrlKey && e.key==='a') {
      codeTextArea.current?.select()
    }
  }
  // TextArea에서 ctrl + a가 안되서 만듦 끝

  const handleCheckSubmit = (e:React.SyntheticEvent<HTMLButtonElement>) => {
    dispatch(algoActions.checkMyAnswerRequestStart({roomCode:InGameInfo.roomCode, problemId:Number(nowProblem.problemId), userBjId:userInfo.bjId, lanId:form.lanId}))
  }

  const handleGoToSolve = () => {
    window.open(`https://www.acmicpc.net/problem/${nowProblem.problemId}`)
  }

  useEffect(() => {
    if (solve) {
      dispatch(algoActions.solveSuccess(false))
      client.send('/api/algo/rank', {}, JSON.stringify({roomCode: InGameInfo.roomCode}))
    }
  }, [solve])

  return <>
    <h2>문제 풀때 컴포넌트</h2>
    <BeforeSolveUsers inGameUsers={inGameUsers} />
    {ranking}
    <ProblemInfo nowProblem={nowProblem} />
    <button onClick={handleGoToSolve}>문제풀러가기</button>
    {languageList.map(language => (
      <label key={language.lanId} htmlFor={language.name}>
        <input type="radio" name="lanId" id={language.name} value={language.lanId} onChange={handleRadio} checked={form.lanId===language.lanId} />
        {language.name}
      </label>
    ))}
    <br />
    <textarea ref={codeTextArea} style={{resize:'none', overflow:"auto"}} rows={30} cols={60} wrap='off' onChange={handleCode} />
    <button onClick={handleCheckSubmit}>정답 확인하기</button>
  </>
}
export default AlgoSolve