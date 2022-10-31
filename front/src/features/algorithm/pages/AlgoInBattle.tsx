import React, { useState } from "react"
import AlgoReview from "../components/AlgoReview"
import AlgoSelect from "../components/AlgoSelect"
import AlgoSolve from "../components/AlgoSolve"

function AlgoInBattle() {
  const [progress, setProgress] = useState<string>('before')

  const handleProgress = (e: React.MouseEvent) => {
    setProgress(e.currentTarget.innerHTML)
  }

  return <>
    <h1>알고리즘 배틀 페이지</h1>
    <button onClick={handleProgress}>before</button>
    <button onClick={handleProgress}>battle</button>
    <button onClick={handleProgress}>review</button>
    {progress === 'before' && <AlgoSelect />}
    {progress === 'battle' && <AlgoSolve />}
    {progress === 'review' && <AlgoReview />}
  </>
}
export default AlgoInBattle