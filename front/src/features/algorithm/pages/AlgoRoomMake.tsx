import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { algoActions } from '../algorithmSlice';
import { AlgoRoomInterface } from '../../../models/algo';
import styled from 'styled-components';
import '../../../components/Common/retroBtn.css';
const Wrapper = styled.div`
  height: 100%;
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border : 1px solid white; */
  .title {
    /* border : 1px solid white; */
    font-size: 4rem;
    margin : 5% 0;
    span {
      margin: auto 0;
      color: #6f43ff;
    }
  }
  .content {
    height: 70%;
    width: 100%;
    display: flex;
    flex-direction: row;
    text-align: center;
    justify-content: center;
    text-align: center;
    p {
      width: 60%;
      font-size: 1.3rem;
      text-align: center;
      padding: 2%;
      margin: auto;
      background-color: #6f43ff;
      /* border: 5px solid #000; */
    }
    .tier {
      margin-right: 1.5%;
      width: 100%;
      .tier-select {
        display: flex;
        flex-direction: row;
        justify-content: center;
        .tier-icon {
          width: 9rem;
          height: 9rem;
        }
      }
      .tier-btn{
        margin-top: 3%;
        border-radius: 15px;
        background-color: #363636;
        border: 5px solid #000;
      }
      .arrow-icon {
        width: 6rem;
        height: 6rem;
        margin: auto;
      }
    }
    .time {
      margin-left: 1.5%;
      width: 100%;
      #time {
        width: 9rem;
        height: 9rem;
        border-radius: 1rem;
        text-align: center;
        font-size: 6rem;
      }
      .time-btn{
        margin-top: 3%;
        border-radius: 15px;
        background-color: #363636;
        border: 5px solid #000;
      }
      .time-input{
        font-size: 8rem;
      }
    }
  }
  .room-info{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    span{
      margin: auto 4%;
      padding-bottom:2px;
      font-size: 1.5rem;
      width: 20%;
      text-align: center;
      border-bottom: 5px solid #6f43ff;
    }
  }
  .btn-div {
    height: 18%;
    width: 100%;
    display: flex;
    justify-content: center;
    a {
      margin: auto 3%;
      width: 20%;
    }
  }
  .strokeme {
    text-shadow: -3px -3px 0 #fff, 3px -3px 0 #fff, -3px 3px 0 #fff,
      3px 3px 0 #fff, 1px 1px 0 #c9b8ff, 2px 2px 0 #c9b8ff, 3px 3px 0 #c9b8ff,
      4px 4px 0 #c9b8ff, 5px 5px 0 #c9b8ff, 6px 6px 0 #c9b8ff;
  }
`;

function AlgoRoomMake() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { InGameInfo } = useSelector((state: any) => state.algo);
  const { userInfo } = useSelector((state: any) => state.auth);

  const [form, setForm] = useState<AlgoRoomInterface>({
    roomCode: '',
    time: '1',
    tier: '1',
    num: '0',
    no: '0',
    master: userInfo.id,
    start: false,
  });
  const tierList: { value: string; alt: string }[] = [];
  for (let i = 1; i < 21; i++) {
    tierList.push({ value: `${i}`, alt: `티어이미지${i}` });
  }

  const handleGoMain = () => {
    navigate('/game/algo');
  };

  useEffect(() => {
    if (!userInfo.bjId) {
      Swal.fire({
        icon: 'info',
        text: '백준아이디를 연동해야지만 게임을 할 수 있습니다',
      });
      handleGoMain();
    }
  }, []);

  const handleTime = (e: string) => {
    const newForm = JSON.parse(JSON.stringify(form));
    if (e === 'minus') {
      if (newForm.time <= 39) {
        Swal.fire({
          icon: 'info',
          text: '30분보다 적게는 설정할 수 없습니다',
        });
        return;
      }
      newForm.time = String(Number(newForm.time) - 10);
    } else {
      if (newForm.time >= 111) {
        Swal.fire({
          icon: 'info',
          text: '120분보다 많게는 설정할 수 없습니다',
        });
        return;
      }
      newForm.time = String(Number(newForm.time) + 10);
    }
    setForm(newForm);
  };
  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(algoActions.creatAlgoRoom(form));
  };

  useEffect(() => {
    if (InGameInfo) {
      navigate('/game/algo/battle');
    }
  }, [InGameInfo]);

  const handleTier = (e: { type: string; num: number }) => {
    const newForm = JSON.parse(JSON.stringify(form));
    if (e.type === 'plus') {
      const newTier = String((Number(newForm.tier) + e.num) % 20);
      if (newTier === '0') {
        newForm.tier = '20';
      } else {
        newForm.tier = newTier;
      }
    } else {
      let newTier = (Number(newForm.tier) - e.num) % 20;
      if (newTier <= 0) {
        newTier += 20;
      }
      newForm.tier = String(newTier);
    }
    setForm(newForm);
  };

  const [tierString, setTierString] = useState<string>('브론즈 5');

  useEffect(() => {
    const color = parseInt(String((Number(form.tier) - 1) / 5));
    const tier = 5 - ((Number(form.tier) - 1) % 5);
    if (color === 0) {
      setTierString(`브론즈 ${tier}`);
    } else if (color === 1) {
      setTierString(`실버 ${tier}`);
    } else if (color === 2) {
      setTierString(`골드 ${tier}`);
    } else if (color === 3) {
      setTierString(`플레티넘 ${tier}`);
    }
  }, [form.tier]);

  return (
    <Wrapper>
      <div className="title">
        <span className="strokeme">방 만들기</span>
      </div>
      <form className="content">
        <div className="tier">
          <p>티어</p>
          <div className='tier-btn'>
            <div>
              <img
                className="arrow-icon"
                src={`/img/arrow/pink-small-arrow-up.png`}
                alt='티어업'
                onClick={()=>{handleTier({type:'plus', num:5})}}
                ></img>
            </div>
            <div className="tier-select">
              <img
                className="arrow-icon"
                src={`/img/arrow/yellow-small-arrow-left.png`}
                alt='티어레프트'
                onClick={()=>{handleTier({type:'minus', num:1})}}
                ></img>
              <img
                className="tier-icon"
                src={`/img/tier/${form.tier}.svg`}
                alt='티어이미지'
                ></img>
              <img
                className="arrow-icon"
                src={`/img/arrow/yellow-small-arrow-right.png`}
                alt='티어롸이트'
                onClick={()=>{handleTier({type:'plus', num:1})}}
                ></img>
            </div>
            <div>
              <img
                className="arrow-icon"
                src={`/img/arrow/pink-small-arrow-down.png`}
                alt='티어다운'
                onClick={()=>{handleTier({type:'minus', num:5})}}
              ></img>
            </div>
          </div>
        </div>
        <div className="time">
          <p>
            <label htmlFor="time">시간제한(분)</label>
          </p>
          <div className='time-btn'>
            <div>
              <img
                className="arrow-icon"
                src={`/img/arrow/pink-small-arrow-up.png`}
                alt='시간+버튼'
                onClick={()=>{handleTime('plus')}}
                ></img>
            </div>
            <div  className='time-input'>
              <span>{form.time}</span>
            </div>
            <div>
              <img
                className="arrow-icon"
                src={`/img/arrow/pink-small-arrow-down.png`}
                alt='시간-버튼'
                onClick={()=>{handleTime('minus')}}
              ></img>
            </div>
          </div>
        </div>
      </form>
      <div className='room-info'>
        <span>{tierString}</span>
        <span>{form.time} 분</span>
      </div>
      <div className="btn-div">
        <a
          onClick={handleOnSubmit}
          className="eightbit-btn eightbit-btn--proceed"
        >
          생성
        </a>
        <a onClick={handleGoMain} className="eightbit-btn">
          취소
        </a>
      </div>
    </Wrapper>
  );
}
export default AlgoRoomMake;
