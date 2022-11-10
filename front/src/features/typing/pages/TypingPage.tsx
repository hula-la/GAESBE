import { Routes, Route } from 'react-router-dom';
import TypingGamePage from './TypingGamePage';
import TypingMainPage from './TypingMainPage';
import TypingResultPage from './TypingResultPage';
function TypingPage() {
  return (
    <>
      <Routes>
        <Route path="" element={<TypingMainPage />} />
        <Route path="/enter" element={<TypingGamePage />} />
        <Route path="/result" element={<TypingResultPage />} />
      </Routes>
    </>
  );
}

export default TypingPage;
