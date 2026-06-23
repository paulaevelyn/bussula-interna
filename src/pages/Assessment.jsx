import { useState } from 'react';
import { questions } from '../data/questions.js';

const ANSWERS = [
  { value: 'sim', label: 'Sim', icon: '✓', className: 'selected-sim' },
  { value: 'incerto', label: 'Não tenho certeza', icon: '~', className: 'selected-incerto' },
  { value: 'nao', label: 'Não', icon: '✕', className: 'selected-nao' },
];

export default function Assessment({ onComplete, onExit }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);

  const question = questions[index];
  const progress = index / questions.length;
  const isLast = index === questions.length - 1;

  function handleSelect(value) {
    setSelected(value);
  }

  function handleNext() {
    if (!selected) return;
    const newAnswers = { ...answers, [question.id]: selected };
    setAnswers(newAnswers);

    if (isLast) {
      onComplete(newAnswers);
    } else {
      setIndex(index + 1);
      setSelected(answers[questions[index + 1]?.id] ?? null);
    }
  }

  function handleBack() {
    if (index === 0) {
      onExit();
      return;
    }
    const prev = index - 1;
    setIndex(prev);
    setSelected(answers[questions[prev].id] ?? null);
  }

  return (
    <main className="page" id="main-content">
      <div className="container">
        <div
          className="progress-track"
          role="progressbar"
          aria-valuenow={index + 1}
          aria-valuemin={1}
          aria-valuemax={questions.length}
          aria-label={`Pergunta ${index + 1} de ${questions.length}`}
        >
          <div className="progress-fill" style={{ width: `${progress * 100}%` }} />
        </div>

        <p className="small dimmed" style={{ marginBottom: '0.5rem' }}>
          Pergunta {index + 1} de {questions.length}
        </p>

        <div className="card">
          {question.timeframeNote && (
            <p
              className="notice-box"
              style={{ marginBottom: '1.25rem', fontSize: '0.875rem' }}
            >
              {question.timeframeNote}
            </p>
          )}

          <h2
            style={{ fontSize: 'clamp(1.1rem, 3vw, 1.35rem)', lineHeight: 1.5, color: 'var(--grafite)', marginBottom: '0.25rem' }}
            id="question-text"
          >
            {question.text}
          </h2>

          <div
            className="answer-group"
            role="group"
            aria-labelledby="question-text"
          >
            {ANSWERS.map(({ value, label, icon, className }) => (
              <button
                key={value}
                className={`answer-btn${selected === value ? ` ${className}` : ''}`}
                onClick={() => handleSelect(value)}
                aria-pressed={selected === value}
              >
                <span
                  className="answer-icon"
                  aria-hidden="true"
                  style={{
                    color: selected === value
                      ? value === 'sim' ? 'var(--coral)' : value === 'nao' ? 'var(--verde)' : '#a09060'
                      : 'var(--grafite-light)',
                  }}
                >
                  {icon}
                </span>
                <span>{label}</span>
              </button>
            ))}
          </div>

          {selected === 'incerto' && (
            <p
              className="small"
              style={{ color: 'var(--grafite-light)', marginTop: '0.75rem', fontStyle: 'italic' }}
            >
              "Não tenho certeza" é uma resposta válida — vale tanto quanto as outras.
            </p>
          )}
        </div>

        <div className="flex" style={{ gap: '0.75rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
          <button className="btn btn-ghost" onClick={handleBack}>
            ← {index === 0 ? 'Sair' : 'Voltar'}
          </button>
          <button
            className="btn btn-primary"
            onClick={handleNext}
            disabled={!selected}
            style={{ flex: 1 }}
          >
            {isLast ? 'Ver resultado' : 'Próxima →'}
          </button>
        </div>
      </div>
    </main>
  );
}
