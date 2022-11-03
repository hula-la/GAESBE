import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
const TypingMain = styled.div`
  width: 82%;
  background-color: #232323;
  justify-content: center;
  text-align: center;
  color: white;
  .title {
    text-align: center;
    height: 30%;
    img {
      height: 60%;
    }
  }
`;
const SelectLanguage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  height: 10rem;
  border: 2px solid red;
  margin-bottom: 5rem;
`;
const SelectLanguageBox = styled.div`
  display: flex;
  justify-content: center;
  width: 10rem;
  align-items: center;
  border: 2px solid blue;
`;
const SelectGameType = styled.div`
  border: 2px solid white;
`;
const SelectTypeBox = styled.div`
  border: 2px solid violet;
`;
function TypingMainPage() {
  const navigate = useNavigate();
  const handleRandomGame = () => {
    navigate('game');
  };
  return (
    <TypingMain>
      <div className="title">
        <img src="/img/gametitle/gametitle2.png" alt="title" />
      </div>
      <h1>언어를 선택해주세요</h1>
      <SelectLanguage>
        <SelectLanguageBox>파이썬</SelectLanguageBox>
        <SelectLanguageBox>자바</SelectLanguageBox>
      </SelectLanguage>
      <SelectGameType>
        <SelectTypeBox>
          <button onClick={handleRandomGame}>랜덤매칭</button>
        </SelectTypeBox>
        <SelectTypeBox>
          <button>친선매칭</button>
        </SelectTypeBox>
      </SelectGameType>
    </TypingMain>
  );
}

export default TypingMainPage;
