import { useEffect } from "react"

import { fetchMyAttendance } from '../../../api/mypageApi'

function AttendanceComponent() {
  useEffect(() => {
    fetchMyAttendanceInfo()
  }, [])

  const fetchMyAttendanceInfo = async () => {
    const res = await fetchMyAttendance()
    console.log(res.data)
  }
  return <>
    <h1>출석체크 페이지</h1>
    <h2>잔디들</h2>
  </>
}
export default AttendanceComponent