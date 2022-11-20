import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Level0 from './level/Level0';

const Wrapper = styled.div``;

const Office = ({ officeId, attendance }: any) => {
  const navigate = useNavigate();

  const { userInfo } = useSelector((state: any) => state.auth);
  const handleCoin = () => {
    navigate('/game/casino');
  };
  const handleAlert = () => {
    navigate('/game/mypage');
    // alert('마이페이지로');
  };
  return (
    <Wrapper>
      {officeId == 0 && <Level0 attendance={attendance} />}
      {officeId == 1 && <Level0 attendance={attendance} />}
      {officeId == 2 && <Level0 attendance={attendance} />}
      {officeId == 3 && <Level0 attendance={attendance} />}
      {officeId == 4 && <Level0 attendance={attendance} />}
      {officeId == 5 && <Level0 attendance={attendance} />}
      {officeId == 6 && <Level0 attendance={attendance} />}
    </Wrapper>
  );
};

export default Level0;
