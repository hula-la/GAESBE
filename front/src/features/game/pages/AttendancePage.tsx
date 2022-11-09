import { useEffect } from "react"

import { fetchMyAttendance } from '../../../api/mypageApi'

function AttendancePage() {
  useEffect(() => {
    const res = fetchMyAttendance()
    console.log(res)
  }, [])
  return <>
    <h1>출석체크 페이지</h1>
    <h2>잔디들</h2>
  </>
}
export default AttendancePage