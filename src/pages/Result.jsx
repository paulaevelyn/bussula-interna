import { useState } from 'react';
import { STATE_META, STATES } from '../data/questions.js';
import { RESOURCES } from '../data/resources.js';
import { getActiveStates, getDiffAnswer, getIntensity } from '../utils/scoring.js';
import { saveEntry, createEntry } from '../utils/storage.js';

function IntensityDot({ state, score }) {
  const meta = STATE_META[state];
  const intensity = getIntensity(score);
  const widths = { alto: '85%', moderado: '55%', baixo: '28%' };
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '0.4rem 0' }}>
      <div style={{ flex: 1, height: 6, background: '#eee', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ width: widths[intensity], height: '100%', background: meta.color, borderRadius: 3, transition: 'width 600ms ease' }} />
      </div>
      <span style={{ fontSize: '0.8rem', color: meta.color, fontWeight: 700, minWidth: 64 }}>
        {intensity === 'alto' ? 'intenso' : intensity === 'moderado' ? 'moderado' : 'leve'}
      </span>
    </div>
  );
}

function StateCard({ state, score, answers, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  const meta = STATE_META[state];
  const res = RESOURCES[state];
  const diffAns = getDiffAnswer(answers, state);

  return (
    <div style={{
      borderRadius: 12, overflow: 'hidden',
      border: `2px solid ${meta.color}`,
      marginBottom: '1.25rem',
      background: open ? meta.colorLight : 'var(--white)',
    }}>
      {/* Header */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
          padding: '1.25rem 1.5rem', background: 'none', border: 'none', cursor: 'pointer',
          textAlign: 'left', gap: '1rem',
        }}
        aria-expanded={open}
        aria-controls={`state-body-${state}`}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
            <h3 style={{ color: meta.color, fontSize: '1.15rem' }}>{meta.label}</h3>
          </div>
          <p style={{ fontSize: '0.92rem', color: 'var(--grafite-light)', lineHeight: 1.5 }}>{meta.tagline}</p>
          <IntensityDot state={state} score={score} />
        </div>
        <span style={{ color: meta.color, fontSize: '1.2rem', marginTop: 4, flexShrink: 0 }}>
          {open ? '▲' : '▼'}
        </span>
      </button>

      {/* Body */}
      {open && (
        <div id={`state-body-${state}`} style={{ padding: '0 1.5rem 1.5rem' }}>

          {/* Primary action — the most important thing */}
          <div style={{
            background: meta.color, color: '#fff', borderRadius: 8,
            padding: '1rem 1.25rem', marginBottom: '1.25rem',
          }}>
            <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.25rem', opacity: 0.85, color: '#fff' }}>
              O que fazer agora
            </p>
            <p style={{ fontWeight: 700, fontSize: '1.05rem', color: '#fff' }}>{res.primaryAction}</p>
          </div>

          {/* Why it works */}
          <p style={{ marginBottom: '1.25rem', color: 'var(--grafite)', fontSize: '0.95rem', lineHeight: 1.7 }}>
            {res.whyItWorks}
          </p>

          {/* Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
            {res.steps.map((step, i) => (
              <div key={i} style={{
                background: '#fff', borderRadius: 8, padding: '0.9rem 1.1rem',
                boxShadow: '0 1px 6px rgba(0,0,0,0.07)',
              }}>
                <p style={{ fontWeight: 700, color: 'var(--grafite)', marginBottom: '0.25rem', fontSize: '0.95rem' }}>
                  {step.label}
                </p>
                <p style={{ fontSize: '0.9rem', color: 'var(--grafite-light)', lineHeight: 1.65 }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>

          {/* How to recognize — differentiation learning */}
          <div style={{
            borderLeft: `3px solid ${meta.color}`,
            paddingLeft: '1rem', marginBottom: '1rem',
            background: '#fff', borderRadius: '0 8px 8px 0', padding: '0.75rem 1rem',
          }}>
            <p style={{ fontSize: '0.8rem', fontWeight: 700, color: meta.color, marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Como reconhecer da próxima vez
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--grafite)', lineHeight: 1.65 }}>{res.howToRecognize}</p>
          </div>

          {/* Differentiator note */}
          {diffAns === 'sim' && (
            <p style={{
              fontSize: '0.875rem', color: 'var(--grafite-light)', fontStyle: 'italic',
              borderTop: '1px solid rgba(0,0,0,0.07)', paddingTop: '0.75rem',
            }}>
              {state === 'sensorial' && 'O sinal que mais pesou: o desconforto aliviou quando você mudou o ambiente — isso é o sinal mais claro de sobrecarga sensorial.'}
              {state === 'ansiedade' && 'O sinal que mais pesou: o desconforto continuou mesmo em silêncio, sem estímulo externo — isso é o que diferencia o alerta da sobrecarga.'}
              {state === 'depressao' && 'O sinal que mais pesou: a queda de energia não melhorou com descanso pontual — isso diferencia esgotamento de cansaço comum.'}
              {state === 'inercia' && 'O sinal que mais pesou: o bloqueio aconteceu sem medo, julgamento ou cenário de fracasso associado — isso diferencia inércia de tarefas do sistema em alerta.'}
            </p>
          )}

          {res.note && (
            <p style={{
              fontSize: '0.875rem', color: 'var(--grafite-light)', fontStyle: 'italic',
              borderTop: '1px solid rgba(0,0,0,0.07)', paddingTop: '0.75rem',
              marginTop: '0.5rem',
            }}>
              {res.note}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default function Result({ scores, answers, onRestart, onGoHistory }) {
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);

  const activeStates = getActiveStates(scores);
  const allStates = [STATES.SENSORIAL, STATES.ANSIEDADE, STATES.DEPRESSAO, STATES.INERCIA];

  function handleSave() {
    saveEntry(createEntry({ scores, answers, note }));
    setSaved(true);
  }

  return (
    <main className="page" id="main-content">
      <div className="container">

        {activeStates.length === 0 ? (
          <>
            <h1 style={{ marginBottom: '1rem' }}>Nenhum estado em evidência agora</h1>
            <div className="card">
              <p style={{ color: 'var(--grafite)', marginBottom: '0.75rem' }}>
                Pelos sinais que você notou, nenhum dos três estados parece estar dominando neste momento.
              </p>
              <p>
                Isso não quer dizer que está tudo bem ou que você precisa continuar performando — só que o que você está sentindo agora talvez não se encaixe nessas três categorias. Você pode revisitar quando quiser.
              </p>
            </div>
          </>
        ) : (
          <>
            <h1 style={{ marginBottom: '0.4rem' }}>
              {activeStates.length === 1
                ? 'O que está acontecendo — e o que fazer'
                : 'Mais de um estado em jogo'}
            </h1>

            {activeStates.length > 1 && (
              <div className="card" style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--verde)' }}>
                <p style={{ color: 'var(--grafite)', lineHeight: 1.7 }}>
                  Esses estados costumam aparecer juntos e se alimentar. Sobrecarga sensorial repetida sem descanso deixa o sistema em alerta constante — o que pode evoluir para esgotamento com o tempo. Os cartões abaixo estão em ordem do que parece mais intenso agora.
                </p>
              </div>
            )}

            <p className="small dimmed" style={{ marginBottom: '1.5rem' }}>
              Clique em cada estado para ver o que fazer com ele.
            </p>

            {activeStates.map((state, i) => (
              <StateCard
                key={state}
                state={state}
                score={scores[state]}
                answers={answers}
                defaultOpen={i === 0}
              />
            ))}

            {/* States that didn't reach threshold — shown collapsed with explanation */}
            {allStates.filter(s => !activeStates.includes(s)).map(state => {
              const meta = STATE_META[state];
              return (
                <div key={state} style={{
                  borderRadius: 8, border: '1px solid var(--areia-dark)',
                  padding: '0.75rem 1.1rem', marginBottom: '0.5rem',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  opacity: 0.55,
                }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--grafite-light)' }}>{meta.label}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--grafite-light)' }}>poucos sinais</span>
                </div>
              );
            })}
          </>
        )}

        {/* Save */}
        <div className="card" style={{ marginTop: '1.75rem' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '0.4rem' }}>Salvar este registro (opcional)</h3>
          <p className="small dimmed" style={{ marginBottom: '0.75rem' }}>
            Registros salvos ajudam a perceber padrões ao longo do tempo. Ficam só neste dispositivo.
          </p>
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            disabled={saved}
            placeholder="O que estava acontecendo hoje? (opcional)"
            aria-label="Nota de contexto"
            style={{
              width: '100%', minHeight: 72, padding: '0.75rem',
              border: '2px solid var(--areia-dark)', borderRadius: 8,
              fontFamily: 'var(--font-body)', fontSize: '0.95rem', resize: 'vertical',
              background: saved ? 'var(--areia)' : 'var(--white)', color: 'var(--grafite)',
            }}
          />
          <button
            className={`btn btn-sm ${saved ? 'btn-ghost' : 'btn-secondary'}`}
            style={{ marginTop: '0.75rem' }}
            onClick={handleSave}
            disabled={saved}
          >
            {saved ? '✓ Salvo' : 'Salvar no histórico'}
          </button>
        </div>

        <div className="flex flex-wrap gap-md" style={{ marginTop: '1.25rem' }}>
          <button className="btn btn-ghost" onClick={onGoHistory}>Ver histórico</button>
          <button className="btn btn-ghost" onClick={onRestart}>Nova avaliação</button>
        </div>
      </div>
    </main>
  );
}
