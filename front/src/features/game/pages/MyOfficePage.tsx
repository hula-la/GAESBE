import React from 'react';
import styled from 'styled-components';
import Level0 from '../components/Level0';
import Level1 from '../components/Level1';
import Level2 from '../components/Level2';
import Level3 from '../components/Level3';
import Level4 from '../components/Level4';
import Level5 from '../components/Level5';
import Level6 from '../components/Level6';
import FriendMainPage from '../../friend/pages/FriendMainPage';
import { attendanceRequest } from '../../../api/mypageApi'

const Friend = styled.div`
  width: 21.75%;
  background-color: #232323;
  border: 2px solid red;
  color: white;
`;
const MyOfficePage = () => {

  const attendance = async () => {
    try {
      const res = await attendanceRequest()
      if (res.status===200) {
        alert('출석체크 되었습니다')
      }
    } catch (error:any) {
      if (error.response.status===446) {
        alert('오늘은 이미 출석했습니다')
      }
    }
  }
  return (
    <>
      <Level0 attendance={attendance} />
      {/* <Level1 /> */}
      {/* <Level2 /> */}
      {/* <Level3 /> */}
      {/* <Level4 /> */}
      {/* <Level5 /> */}
      {/* <Level6 /> */}
      <FriendMainPage />
    </>
  );
};

export default MyOfficePage;
