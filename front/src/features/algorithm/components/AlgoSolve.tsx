
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { ProblemInterface } from '../../../models/algo'
import { algoActions } from '../algorithmSlice'


interface LanguageInterface {
  lanId: number
  name: string
}


function AlgoSolve({problemList, problemIndex}: any ) {
  const dispatch = useDispatch()

  const languageList: LanguageInterface[] = [{lanId: 1001, name: 'c++'},{lanId: 1002, name: 'java'}, {lanId: 1003, name : 'python'}, {lanId: 1004, name : 'c'}]
  const nowProblem: ProblemInterface = problemList[problemIndex]
  const {InGameInfo} = useSelector((state:any) => state.algo)
  const {userInfo} = useSelector((state:any)=>state.auth)
  const [form, setForm] = useState<{lanId: number, code: string}>({lanId: 1003, code:''})

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

  const codeTextArea = useRef<HTMLTextAreaElement>(null)
  codeTextArea.current?.addEventListener("keydown", keysPressed);
  function keysPressed(e:any) {
    if (e.ctrlKey && e.key==='a') {
      console.log(codeTextArea.current?.select())
    }
  }

  const handleCheckSubmit = (e:React.SyntheticEvent<HTMLButtonElement>) => {
    // console.log(e)
    dispatch(algoActions.checkMyAnswerRequestStart({roomCode:InGameInfo.roomCode, problemId:Number(nowProblem.problemId), userBjId:userInfo.bjId, lanId:form.lanId}))
  }

  return <>
    <h2>문제 풀때 컴포넌트</h2>
    <p>문제 번호: {nowProblem.problemId}</p>
    <p>문제 제목: {nowProblem.title}</p>
    <p>제출 수: {nowProblem.submit}</p>
    <p>정답 수: {nowProblem.correct}</p>
    <p>정답률: {nowProblem.ratio}</p>
    <p>{nowProblem.tag}</p>
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