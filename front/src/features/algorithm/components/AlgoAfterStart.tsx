import { useState, useEffect } from "react"
import { usePrompt } from "../../../utils/block"


import AlgoSelect from "./AlgoSelect"
import AlgoSolve from "./AlgoSolve"

function AlgoAfterStart({ handleLeaveRoom }: any) {
  const [progress, setProgress] = useState<string>('select')
  const handleProgress = (e: React.MouseEvent) => {
    setProgress(e.currentTarget.innerHTML)
  }

  useEffect(() => {
    const preventGoBack = () => {
      // change start
      window.history.pushState(null, '', window.location.href);
      // change end
      alert('도망가지 마라!!')
    };
    
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', preventGoBack);
    
    return () => window.removeEventListener('popstate', preventGoBack);
  }, []);   


  usePrompt("감히 등을 보이는 게냐!!", true);

  const handleLeaveRoomConfirm = ()=>  {
    if (window.confirm('감히 등을 보이는 게냐!!')) {
      handleLeaveRoom()
    }
  }

  return <>
    <h1>주사위는 던져졌다!!</h1>
    <button onClick={handleProgress}>select</button>
    <button onClick={handleProgress}>solve</button>
    <button onClick={handleLeaveRoomConfirm}>게임방에서 나가기</button>
    {progress === 'select' && <AlgoSelect />}
    {progress === 'solve' && <AlgoSolve />}
  </>
}
export default AlgoAfterStart