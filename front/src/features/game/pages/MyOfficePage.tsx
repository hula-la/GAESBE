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

const Wrapper = styled.div`
  width: 66%;
  height: 97%;
  position: relative;
  .abilitys {
    position: absolute;
    bottom: 3%;
    left: 12%;
    display: flex;
    flex-direction: row;
    color: #ffffff;
    width: 90%;
    .ability {
      margin-right: 5rem;
      width: 25%;
      font-family: 'NeoDunggeunmo';
      font-size: 1.2rem;
      font-weight: 500;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .gaze {
      width: 100%;
      margin-top: 0.5rem;
      /* box-shadow: 0px 0px 3px 4px #ffffff; */
    }
  }
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
    <Wrapper>
      <Level0 attendance={attendance} />
      {/* <Level1 /> */}
      {/* <Level2 /> */}
      {/* <Level3 /> */}
      {/* <Level4 /> */}
      {/* <Level5 /> */}
      {/* <Level6 /> */}
      {userAbility && (
        <div className="abilitys">
          <div className="ability">
            <div>ALGORITHM Lv.{userAbility.algorithmLv}</div>
            <img
              className="gaze"
              src={`/img/ability/expBar/exp${userAbility.algorithmExp}.png`}
              alt="algo_exp"
            />
          </div>
          <div className="ability">
            <div>CS Lv.{userAbility.csLv}</div>
            <img
              className="gaze"
              src={`/img/ability/expBar/exp${userAbility.csExp}.png`}
              alt="cs_exp"
            />
          </div>
          <div className="ability">
            <div>TYPING Lv.{userAbility.typingLv}</div>
            <img
              className="gaze"
              src={`/img/ability/expBar/exp${userAbility.typingExp}.png`}
              alt="typing_exp"
            />
          </div>
          <div className="ability">
            <div>LUCK Lv.{userAbility.luckLv}</div>
            <img
              className="gaze"
              src={`/img/ability/expBar/exp${userAbility.luckExp}.png`}
              alt="luck_exp"
            />
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default MyOfficePage;
