import { useState, useEffect } from 'react';
import { loadHistory, deleteEntry, clearHistory, formatDate } from '../utils/storage.js';
import { STATE_META, STATES, THRESHOLD } from '../data/questions.js';
import { getActiveStates } from '../utils/scoring.js';

const allStates = [STATES.SENSORIAL, STATES.ANSIEDADE, STATES.DEPRESSAO, STATES.INERCIA];

function MiniChart({ history }) {
  if (history.length < 2) return null;

  const W = 500, H = 140, PAD = 32;
  const points = [...history].reverse().slice(0, 20);
  const n = points.length;
  const xStep = (W - PAD * 2) / Math.max(n - 1, 1);
  const x = (i) => PAD + i * xStep;
  const y = (v) => H - PAD - (v / 6) * (H - PAD * 2);

  return (
    <div
      className="chart-area"
      role="img"
      aria-label="Gráfico do histórico de pontuações ao longo do tempo"
    >
      <h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>
        Padrão ao longo do tempo
      </h3>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: '100%', height: 'auto', display: 'block' }}
        aria-hidden="true"
      >
        {[0, 3, 6].map((v) => (
          <g key={v}>
            <line x1={PAD} y1={y(v)} x2={W - PAD} y2={y(v)} stroke="#e8e1d3" strokeWidth="1" />
            <text x={PAD - 6} y={y(v) + 4} textAnchor="end" fontSize="10" fill="#aaa">{v}</text>
          </g>
        ))}
        <line
          x1={PAD} y1={y(THRESHOLD)} x2={W - PAD} y2={y(THRESHOLD)}
          stroke="#bbb" strokeDasharray="4 3" strokeWidth="1.5"
        />
        {allStates.map((state) => {
          const d = points
            .map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(p.scores?.[state] ?? 0)}`)
            .join(' ');
          return (
            <path
              key={state}
              d={d}
              fill="none"
              stroke={STATE_META[state].color}
              strokeWidth="2.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          );
        })}
        {allStates.map((state) =>
          points.map((p, i) => (
            <circle
              key={`${state}-${i}`}
              cx={x(i)}
              cy={y(p.scores?.[state] ?? 0)}
              r="3.5"
              fill={STATE_META[state].color}
            />
          ))
        )}
      </svg>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '0.75rem' }}>
        {allStates.map((state) => (
          <span key={state} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', color: 'var(--grafite-light)' }}>
            <span style={{ width: 16, height: 3, background: STATE_META[state].color, borderRadius: 2, display: 'inline-block' }} />
            {STATE_META[state].label}
          </span>
        ))}
        <span style={{ fontSize: '0.875rem', color: 'var(--grafite-light)', opacity: 0.6 }}>— — limiar</span>
      </div>
    </div>
  );
}

export default function History() {
  const [history, setHistory] = useState([]);
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  function handleDelete(id) {
    deleteEntry(id);
    setHistory(loadHistory());
  }

  function handleClear() {
    clearHistory();
    setHistory([]);
    setConfirmClear(false);
  }

  return (
    <main className="page" id="main-content">
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <h1>Histórico</h1>
          {history.length > 0 && !confirmClear && (
            <button className="btn btn-ghost btn-sm" onClick={() => setConfirmClear(true)}>
              Limpar tudo
            </button>
          )}
          {confirmClear && (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-primary btn-sm" onClick={handleClear}>Confirmar</button>
              <button className="btn btn-ghost btn-sm" onClick={() => setConfirmClear(false)}>Cancelar</button>
            </div>
          )}
        </div>

        <p className="small dimmed" style={{ marginBottom: '1.75rem' }}>
          Isso pode ajudar você — e seu terapeuta, se você tiver um — a notar padrões e gatilhos ao longo do tempo.
        </p>

        {history.length === 0 ? (
          <div className="card" style={{ textAlign: 'center' }}>
            <p>Nenhuma avaliação salva ainda.</p>
            <p className="small dimmed" style={{ marginTop: '0.5rem' }}>
              Após concluir e salvar uma autoavaliação, ela aparece aqui.
            </p>
          </div>
        ) : (
          <>
            <MiniChart history={history} />

            <div aria-label="Lista de avaliações salvas">
              {history.map((entry) => {
                const active = getActiveStates(entry.scores ?? {});
                return (
                  <div key={entry.id} style={{
                    borderRadius: 12, background: 'var(--white)',
                    padding: '1.25rem 1.5rem', boxShadow: '0 2px 12px rgba(46,46,46,0.08)',
                    marginBottom: '0.75rem',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--grafite-light)' }}>
                        {formatDate(entry.timestamp)}
                      </span>
                      <button
                        className="btn btn-ghost btn-sm"
                        aria-label={`Excluir registro de ${formatDate(entry.timestamp)}`}
                        onClick={() => handleDelete(entry.id)}
                        style={{ fontSize: '0.8rem', padding: '0.25rem 0.6rem' }}
                      >
                        Excluir
                      </button>
                    </div>

                    {/* Active state badges */}
                    {active.length > 0 ? (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.5rem' }}>
                        {active.map((s) => (
                          <span
                            key={s}
                            style={{
                              display: 'inline-block', padding: '0.2rem 0.65rem',
                              borderRadius: 999, fontSize: '0.8rem', fontWeight: 700,
                              background: STATE_META[s].colorLight, color: STATE_META[s].color,
                            }}
                          >
                            {STATE_META[s].label}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p style={{ fontSize: '0.85rem', color: 'var(--grafite-light)', marginBottom: '0.4rem' }}>
                        Nenhum estado em evidência
                      </p>
                    )}

                    {/* Score mini-bars */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                      {allStates.map((state) => {
                        const score = entry.scores?.[state] ?? 0;
                        const pct = Math.round((score / 6) * 100);
                        return (
                          <div key={state} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '0.75rem', color: STATE_META[state].color, width: 130, flexShrink: 0 }}>
                              {STATE_META[state].label}
                            </span>
                            <div style={{ flex: 1, height: 5, background: '#eee', borderRadius: 3, overflow: 'hidden' }}>
                              <div style={{
                                width: `${pct}%`, height: '100%',
                                background: STATE_META[state].color, borderRadius: 3,
                              }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {entry.note && (
                      <p style={{ fontSize: '0.875rem', color: 'var(--grafite-light)', fontStyle: 'italic', marginTop: '0.65rem' }}>
                        "{entry.note}"
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
