import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Level0 from '../components/level/Level0';
import Level1 from '../components/level/Level1';
import Level2 from '../components/level/Level2';
import Level3 from '../components/level/Level3';
import Level4 from '../components/level/Level4';
import Level5 from '../components/level/Level5';
import Level6 from '../components/level/Level6';

import { attendanceRequest } from '../../../api/mypageApi';
import AttendanceComponent from '../components/AttendanceComponent';
import { gameActions } from '../gameSlice';
import { itemActions } from '../itemSlice';
import { useSelector, useDispatch } from 'react-redux';
const Wrapper = styled.div`
  height: 100%;
  width: 100%;

  position: relative;

  overflow: hidden;

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

const Office = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  .officeName {
    z-index: 5;
    position: absolute;
    left: 3rem;
    top: 3rem;
    font-size: 2rem;
    color: white;
    /* font-weight: bold; */
  }
`;

const OfficeBtn = styled.img`
  position: absolute;
  width: 50px;
  height: 50px;
  z-index: 5;
  top: calc(50% - 25px);

  transition: 0.3s transform;
  :hover {
    transform: scale(1.2);
  }

  &.prevBtn {
    left: 2rem;
  }
  &.nextBtn {
    right: 2rem;
  }
`;

const Offices = styled('div')<{ officeIdx: number }>`
  /* overflow: hidden; */
  /* border: 5px solid white; */
  height: 100%;
  /* width: 100%; */
  display: flex;

  flex-wrap: wrap;
  flex-direction: column;

  transform: translateX(calc(-100 * ${(props) => props.officeIdx}%));
  transition: transform 1s;
`;

const MyOfficePage = () => {
  const dispatch = useDispatch();
  const [officeIdx, setOfficeIdx] = useState(0);
  const idxRef = useRef(0);
  const { userAbility } = useSelector((state: any) => state.auth);
  const { offices } = useSelector((state: any) => state.item);

  const officeComponents = [
    Level0,
    Level1,
    Level2,
    Level3,
    Level4,
    Level5,
    Level6,
  ];

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [needReload, setNeedReload] = useState<boolean>(false);
  const handleModal = () => {
    setModalOpen(!modalOpen);
  };
  const handleReload = (e: boolean) => {
    setNeedReload(e);
  };

  useEffect(() => {
    dispatch(itemActions.fetchCharacterStart());
    dispatch(itemActions.fetchOfficeStart());
  }, []);

  const officePrev = () => {
    idxRef.current -= 1;
    setOfficeIdx(idxRef.current);
  };
  const officeNext = () => {
    idxRef.current += 1;
    setOfficeIdx(idxRef.current);
  };

  const attendance = async () => {
    try {
      const res = await attendanceRequest();
      if (res.status === 200) {
        alert('출석체크 되었습니다');
        handleReload(true);
      }
    } catch (error: any) {
      if (error.response.status === 446) {
        alert('오늘은 이미 출석했습니다');
      }
    }
  };
  // useEffect(() => {
  //   // dispatch(itemActions.fetchCharacterStart());
  //   dispatch(gameActions.fetchRecordStart());
  // }, []);
  return (
    <Wrapper>
      {offices && officeIdx > 0 && (
        <OfficeBtn
          className="prevBtn"
          src="/img/arrow/pink-small-arrow-right.png"
          onClick={officePrev}
        />
      )}
      {offices && officeIdx < offices.length - 1 && (
        <OfficeBtn
          className="nextBtn"
          onClick={officeNext}
          src="/img/arrow/pink-small-arrow-left.png"
        />
      )}

      {offices && (
        <Offices officeIdx={officeIdx}>
          {offices.map((v: any, idx: number) => {
            const Component: any = officeComponents[idx];
            return (
              <Office>
                <div className="officeName">{v.name}</div>

                {v.own && <Component officeIdx={v} handleModal={handleModal} />}
              </Office>
            );
          })}

          {modalOpen && (
            <AttendanceComponent
              needReload={needReload}
              handleReload={handleReload}
              attendance={attendance}
              handleModal={handleModal}
            />
          )}
        </Offices>
      )}

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
