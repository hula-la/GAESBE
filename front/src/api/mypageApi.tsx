import client from "./client";

export const fetchMyAttendance = async () => {
  const res = await client.get('/attendance/check')
  return res
}

export const attendanceRequest = async () => {
  const res = await client.post('/attendance/check')
  return res
}