import { Routes, Route } from 'react-router-dom';
import TypingGamePage from './TypingGamePage';
// import TypingMainPage from './TypingMainPage';
function TypingPage() {
  return (
    <>
      <Routes>
        <Route path="" element={<TypingGamePage />} />
        {/* <Route path="" element={<TypingMainPage />} /> */}
        <Route path="typing/game" element={<TypingGamePage />} />
      </Routes>
    </>
  );
}

export default TypingPage;
