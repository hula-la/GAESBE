import { useEffect, useState } from 'react';

import { fetchMyAttendance } from '../../../api/mypageApi';
import AttendanceCalendar from './AttendanceCalendar';

import styled from 'styled-components';

const StyledModal = styled.div`
  padding: 3vmin;
  width: 40vw;
  height: 70vh;
  position: fixed;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* background-color: gray; */
  /* border: 1px solid black; */
  border-radius: 20px;
  background-color: white;
  z-index: 1000;
  color: black;
`;
const StyledModalDiv = styled.div`
  top: 0%;
  left: 0%;
  position: fixed;
  width: 1000%;
  height: 1000%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.4);
`;
const AttendanceButton = styled.button`
  position: absolute;
`;

interface AttendanceInfoInterface {
  date: string;
  display: string;
}
function AttendanceComponent({
  handleModal,
  attendance,
  handleReload,
  needReload,
}: any) {
  const [attendanceInfo, setAttendanceInfo] = useState<
    AttendanceInfoInterface[]
  >([]);

  useEffect(() => {
    fetchMyAttendanceInfo();
  }, []);
  useEffect(() => {
    if (needReload) {
      fetchMyAttendanceInfo();
      handleReload(false);
    }
  }, [needReload]);
  const fetchMyAttendanceInfo = async () => {
    const res = await fetchMyAttendance();
    const attendanceInfo = res.data.map((date: string) => {
      return {
        date: date.replaceAll('.', '-'),
        display: 'background',
        color: '#577CEF',
      };
    });
    setAttendanceInfo(attendanceInfo);
  };

  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      // overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  return (
    <StyledModalDiv onClick={handleModal}>
      <StyledModal onClick={(e) => e.stopPropagation()}>
        <h1>출석체크 페이지</h1>
        <AttendanceButton onClick={attendance}>출석체크하기</AttendanceButton>
        <AttendanceCalendar attendanceInfo={attendanceInfo} />
      </StyledModal>
    </StyledModalDiv>
  );
}
export default AttendanceComponent;
