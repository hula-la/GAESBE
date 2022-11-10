import React from 'react';
import styled from 'styled-components';
import Level0 from '../components/Level0';
import Level1 from '../components/Level1';
import Level2 from '../components/Level2';
import Level3 from '../components/Level3';
import Level4 from '../components/Level4';
import Level5 from '../components/Level5';
import Level6 from '../components/Level6';
import { attendanceRequest } from '../../../api/mypageApi';
import { useSelector } from 'react-redux';

const MyRoom = styled.div`
  width: 100%;
  height: 100%;
`;

const MyOfficePage = () => {
  const { userAbility } = useSelector((state: any) => state.auth);
  const attendance = async () => {
    try {
      const res = await attendanceRequest();
      if (res.status === 200) {
        alert('출석체크 되었습니다');
      }
    } catch (error: any) {
      if (error.response.status === 446) {
        alert('오늘은 이미 출석했습니다');
      }
    }
  };
  return (
    <MyRoom>
      <Level0 attendance={attendance} />
      {/* <Level1 /> */}
      {/* <Level2 /> */}
      {/* <Level3 /> */}
      {/* <Level4 /> */}
      {/* <Level5 /> */}
      {/* <Level6 /> */}
      <div>
        <div>
          <div>ALGORITHM LV.{}</div>
          <img src="" alt="algo_exp" />
        </div>
      </div>
    </MyRoom>
  );
};

export default MyOfficePage;
