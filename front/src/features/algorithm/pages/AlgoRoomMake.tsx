import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Form {
  title: string
}

function AlgoRoomMake() {
  const navigate = useNavigate()

  const [form, setForm] = useState<Form>({title: ''})

  const handleGoMain = () => {
    navigate('/meta')
  }

  const handeOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(form)
  }

  return <>
    <h1>방 만들기</h1>
    <button onClick={handleGoMain}>취소</button>
    <form>
      <label htmlFor="title">이름</label>
      <input type="text" name="title" id="title" onChange={handeOnChange} />
      <button onClick={handleOnSubmit}>생성</button>
    </form>
  </>
}
export default AlgoRoomMake