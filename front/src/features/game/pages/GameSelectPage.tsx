import { useNavigate } from 'react-router-dom';

function GameSelectPage() {
  const navigate = useNavigate();
  return (
    <>
      <h1>게임 선택 페이지</h1>
      <button onClick={() => navigate('/game/typing')}>타이핑게임</button>
      <button onClick={() => navigate('/game/CS')}>CS게임</button>
      <button onClick={() => navigate('/game/algo')}>알고배틀</button>
      <button onClick={() => navigate('/game/casino')}>싸피게임</button>
    </>
  );
}
export default GameSelectPage;
