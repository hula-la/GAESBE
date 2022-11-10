import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { algoActions } from '../algorithmSlice' 
import { AlgoRoomInterface } from '../../../models/algo'

function AlgoRoomMake() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { InGameInfo } = useSelector((state:any) => state.algo)
  const { userInfo } = useSelector((state:any) => state.auth)

  const [form, setForm] = useState<AlgoRoomInterface>({roomCode: '', time: '30', tier: '1', num: '0', no: '0', master: userInfo.id, start: false})
  const tierList: {value: string, alt:string}[] = []
  for (let i = 1; i < 21; i++) {
    tierList.push({value: `${i}`, alt:`티어이미지${i}`})
  }

  const handleGoMain = () => {
    navigate('/game/algo')
  }

  const handeOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(algoActions.creatAlgoRoom(form))
  }

  useEffect(() => {
    if (InGameInfo) {
      navigate('/game/algo/battle')
    }
  }, [InGameInfo])

  return <>
    <h1>방 만들기</h1>
    <button onClick={handleGoMain}>취소</button>
    <form>
      <label htmlFor="time">시간제한</label>
      <input type="number" name="time" id="time" defaultValue={'30'} min={'30'} max={'120'} step={10} onChange={handeOnChange} />
      <span>분</span>
      <p>문제 난이도</p>
      {tierList.map((tier => (
        <label key={tier.value} htmlFor={tier.value}>
          <input type="radio" name="tier" id={tier.value} onChange={handeOnChange} value={tier.value} checked={tier.value === form.tier} />
          <img style={{width: '1.2em', height: '1.2em'}} src={`/img/tier/${tier.value}.svg`} alt={tier.alt} />
        </label>
      )))}
      <button onClick={handleOnSubmit}>생성</button>
    </form>
  </>
}
export default AlgoRoomMake