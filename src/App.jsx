import { useState } from 'react';
import Nav from './components/Nav.jsx';
import Home from './pages/Home.jsx';
import Assessment from './pages/Assessment.jsx';
import Result from './pages/Result.jsx';
import Resources from './pages/Resources.jsx';
import History from './pages/History.jsx';
import Report from './pages/Report.jsx';
import { computeScores, getActiveStates } from './utils/scoring.js';

export default function App() {
  const [page, setPage] = useState('home');
  const [answers, setAnswers] = useState(null);
  const [scores, setScores] = useState(null);
  const [resultStates, setResultStates] = useState([]);

  function navigate(target) {
    setPage(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleAssessmentComplete(finalAnswers) {
    const s = computeScores(finalAnswers);
    setAnswers(finalAnswers);
    setScores(s);
    setResultStates(getActiveStates(s));
    navigate('result');
  }

  function restart() {
    setAnswers(null);
    setScores(null);
    setResultStates([]);
    navigate('assessment');
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
      <a
        href="#main-content"
        className="btn btn-primary btn-sm"
        style={{ position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)', zIndex: 300 }}
        onFocus={e => { e.currentTarget.style.top = '0'; }}
        onBlur={e => { e.currentTarget.style.top = '-60px'; }}
      >
        Ir para o conteúdo
      </a>

      <Nav page={page} onNavigate={navigate} />

      <div style={{ flex: 1 }}>
        {page === 'home' && (
          <Home onStart={() => navigate('assessment')} onGoResources={() => navigate('resources')} />
        )}
        {page === 'assessment' && (
          <Assessment onComplete={handleAssessmentComplete} onExit={() => navigate('home')} />
        )}
        {page === 'result' && scores && (
          <Result
            scores={scores}
            answers={answers}
            onRestart={restart}
            onGoHistory={() => navigate('history')}
          />
        )}
        {page === 'resources' && (
          <Resources highlightStates={resultStates} />
        )}
        {page === 'history' && <History />}
        {page === 'report' && <Report />}
      </div>
    </div>
  );
}
