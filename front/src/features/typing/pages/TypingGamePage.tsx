import TypingGame from '../components/TypingGame';
import styled from 'styled-components';
const TypingGameMain = styled.div`
  width: 82%;
  background-color: #232323;
  .title {
    text-align: center;
    height: 30%;
    img {
      height: 60%;
    }
  }
`;
function TypingGamePage() {
  return (
    <TypingGameMain>
      <div className="title">
        <img src="img/gametitle/gametitle2.png" alt="title" />
      </div>
      <TypingGame />
    </TypingGameMain>
  );
}

export default TypingGamePage;
