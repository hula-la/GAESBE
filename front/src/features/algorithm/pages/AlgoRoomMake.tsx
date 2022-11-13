import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { algoActions } from '../algorithmSlice';
import { AlgoRoomInterface } from '../../../models/algo';
import styled from 'styled-components';
import '../../typing/pages/retroBtn.css';

const Wrapper = styled.div`
  height: 100%;
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .title {
    height: 10%;
    font-size: 5rem;
    span {
      margin: auto 0;
      color: #6f43ff;
    }
  }
  .content {
    height: 65%;
    width: 100%;
    display: flex;
    flex-direction: row;
    text-align: center;
    justify-content: center;
    p {
      font-size: 2rem;
      text-align: center;
      padding: 3%;
      margin: 3%;
      background-color: #6f43ff;
      border: 5px solid #000;
    }
    .tier {
      margin-right: 3%;
      width: 100%;
      .tier-select {
        display: flex;
        flex-direction: row;
        justify-content: center;
        .tier-icon {
          width: 9rem;
          height: 9rem;
          border-radius: 1rem;
          background-color: #000000;
          padding: 6%;
        }
      }

      .arrow-icon {
        width: 6rem;
        height: 6rem;
        margin: auto;
      }
    }
    .time {
      margin-left: 3%;
      width: 100%;
      #time {
        width: 9rem;
        height: 9rem;
        border-radius: 1rem;
        text-align: center;
        font-size: 6rem;
      }
    }
  }
  .btn-div {
    height: 25%;
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
    time: '30',
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
      alert('백준아이디를 연동해야지만 게임을 할 수 있습니다');
      handleGoMain();
    }
  }, []);

  const handeOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.currentTarget.name]: e.currentTarget.value,
    });
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

  return (
    <Wrapper>
      <p className="title">
        <span className="strokeme">방 만들기</span>
      </p>
      <form className="content">
        <div className="tier">
          <p>티어</p>
          <div>
            <img
              className="arrow-icon"
              src={`/img/arrow/pink-small-arrow-up.png`}
            ></img>
          </div>
          <div className="tier-select">
            <img
              className="arrow-icon"
              src={`/img/arrow/yellow-small-arrow-left.png`}
            ></img>
            <img
              className="tier-icon"
              src={`/img/tier/${tierList[0].value}.svg`}
            ></img>
            <img
              className="arrow-icon"
              src={`/img/arrow/yellow-small-arrow-right.png`}
            ></img>
          </div>
          <div>
            <img
              className="arrow-icon"
              src={`/img/arrow/pink-small-arrow-down.png`}
            ></img>
          </div>
          {/* {tierList.map((tier) => (
            <label key={tier.value} htmlFor={tier.value}>
              <input
                type="radio"
                name="tier"
                id={tier.value}
                onChange={handeOnChange}
                value={tier.value}
                checked={tier.value === form.tier}
              />
              <img
                style={{ width: '1.2em', height: '1.2em' }}
                src={`/img/tier/${tier.value}.svg`}
                alt={tier.alt}
              />
            </label>
          ))} */}
        </div>
        <div className="time">
          <p>
            <label htmlFor="time">시간제한(분)</label>
          </p>
          <div>
            <img
              className="arrow-icon"
              src={`/img/arrow/pink-small-arrow-up.png`}
            ></img>
          </div>
          <input
            type="number"
            name="time"
            id="time"
            defaultValue={'30'}
            min={'30'}
            max={'120'}
            step={10}
            onChange={handeOnChange}
          />
          <div>
            <img
              className="arrow-icon"
              src={`/img/arrow/pink-small-arrow-down.png`}
            ></img>
          </div>
        </div>
      </form>
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
