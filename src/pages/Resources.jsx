import { useState } from 'react';
import { STATE_META, STATES } from '../data/questions.js';
import { RESOURCES, DIFFERENTIATION } from '../data/resources.js';

const TABS = [
  { id: STATES.SENSORIAL },
  { id: STATES.ANSIEDADE },
  { id: STATES.DEPRESSAO },
  { id: 'diferenciar' },
];

function ResourceTab({ state }) {
  const meta = STATE_META[state];
  const res = RESOURCES[state];

  return (
    <div>
      <div style={{ background: meta.color, borderRadius: 10, padding: '1.25rem 1.5rem', marginBottom: '1.5rem' }}>
        <h2 style={{ color: '#fff', marginBottom: '0.35rem', fontSize: 'clamp(1.2rem,3vw,1.6rem)' }}>{meta.label}</h2>
        <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: '0.95rem' }}>{meta.tagline}</p>
      </div>

      <div style={{
        background: meta.colorLight, borderRadius: 8, padding: '1rem 1.25rem',
        marginBottom: '1.25rem', borderLeft: `4px solid ${meta.color}`,
      }}>
        <p style={{ fontSize: '0.85rem', fontWeight: 700, color: meta.color, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
          O que fazer agora
        </p>
        <p style={{ color: 'var(--grafite)', fontWeight: 700, fontSize: '1rem' }}>{res.primaryAction}</p>
      </div>

      <p style={{ marginBottom: '1.25rem', color: 'var(--grafite)', lineHeight: 1.75 }}>{res.whyItWorks}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
        {res.steps.map((step, i) => (
          <div key={i} style={{ background: 'var(--white)', borderRadius: 8, padding: '1rem 1.1rem', boxShadow: '0 1px 6px rgba(0,0,0,0.07)' }}>
            <p style={{ fontWeight: 700, color: 'var(--grafite)', marginBottom: '0.25rem' }}>{step.label}</p>
            <p style={{ fontSize: '0.9rem', color: 'var(--grafite-light)', lineHeight: 1.65 }}>{step.body}</p>
          </div>
        ))}
      </div>

      <div style={{
        borderLeft: `3px solid ${meta.color}`, padding: '0.75rem 1rem',
        background: 'var(--white)', borderRadius: '0 8px 8px 0', marginBottom: '1rem',
        boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
      }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 700, color: meta.color, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.3rem' }}>
          Como reconhecer da próxima vez
        </p>
        <p style={{ fontSize: '0.9rem', color: 'var(--grafite)', lineHeight: 1.65 }}>{res.howToRecognize}</p>
      </div>

      {res.note && (
        <p style={{ fontSize: '0.875rem', color: 'var(--grafite-light)', fontStyle: 'italic', padding: '0.75rem 0' }}>
          {res.note}
        </p>
      )}
    </div>
  );
}

function DifferentiationTab() {
  return (
    <div>
      <h2 style={{ marginBottom: '0.5rem' }}>Como diferenciar os estados</h2>
      <p style={{ marginBottom: '1.5rem', color: 'var(--grafite)', lineHeight: 1.7 }}>
        Às vezes é difícil saber o que está acontecendo — os três estados podem se parecer por fora. Essas perguntas ajudam a distinguir.
      </p>

      {DIFFERENTIATION.map((item, i) => (
        <div key={i} style={{
          background: 'var(--white)', borderRadius: 10, padding: '1.25rem 1.5rem',
          marginBottom: '1rem', boxShadow: '0 1px 8px rgba(0,0,0,0.08)',
        }}>
          <p style={{ fontWeight: 700, color: 'var(--grafite)', marginBottom: '1rem', lineHeight: 1.5 }}>
            {item.question}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '0.75rem' }}>
            <div style={{
              background: item.sim.state ? STATE_META[item.sim.state].colorLight : '#f5f0e8',
              borderRadius: 8, padding: '0.75rem',
              borderLeft: `3px solid ${item.sim.state ? STATE_META[item.sim.state].color : '#bbb'}`,
            }}>
              <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#777', marginBottom: '0.2rem' }}>Sim →</p>
              <p style={{
                fontSize: '0.875rem', fontWeight: 700,
                color: item.sim.state ? STATE_META[item.sim.state].color : 'var(--grafite)',
              }}>
                {item.sim.label}
              </p>
            </div>
            <div style={{
              background: item.nao.state ? STATE_META[item.nao.state].colorLight : '#f5f0e8',
              borderRadius: 8, padding: '0.75rem',
              borderLeft: `3px solid ${item.nao.state ? STATE_META[item.nao.state].color : '#bbb'}`,
            }}>
              <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#777', marginBottom: '0.2rem' }}>Não →</p>
              <p style={{
                fontSize: '0.875rem', fontWeight: 700,
                color: item.nao.state ? STATE_META[item.nao.state].color : 'var(--grafite-light)',
              }}>
                {item.nao.label}
              </p>
            </div>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--grafite-light)', fontStyle: 'italic' }}>{item.note}</p>
        </div>
      ))}
    </div>
  );
}

export default function Resources({ highlightStates = [] }) {
  const [tab, setTab] = useState(
    highlightStates.length > 0 ? highlightStates[0] : STATES.SENSORIAL
  );

  const tabDefs = [
    { id: STATES.SENSORIAL, label: STATE_META.sensorial.label, color: STATE_META.sensorial.color },
    { id: STATES.ANSIEDADE, label: STATE_META.ansiedade.label, color: STATE_META.ansiedade.color },
    { id: STATES.DEPRESSAO, label: STATE_META.depressao.label, color: STATE_META.depressao.color },
    { id: 'diferenciar', label: 'Como diferenciar', color: 'var(--grafite)' },
  ];

  return (
    <main className="page" id="main-content">
      <div className="container">
        <h1 style={{ marginBottom: '0.35rem' }}>O que fazer com cada estado</h1>
        <p className="small dimmed" style={{ marginBottom: '1.5rem' }}>
          Você pode consultar aqui a qualquer momento — sem precisar fazer a autoavaliação.
        </p>

        <div role="tablist" aria-label="Selecionar estado" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.75rem' }}>
          {tabDefs.map(t => {
            const isActive = tab === t.id;
            const isHighlighted = highlightStates.includes(t.id);
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setTab(t.id)}
                style={{
                  padding: '0.5rem 1rem', borderRadius: 8, border: `2px solid ${t.color}`,
                  background: isActive ? t.color : 'var(--white)',
                  color: isActive ? '#fff' : t.color,
                  fontFamily: 'var(--font-body)', fontSize: '0.875rem',
                  fontWeight: isHighlighted ? 700 : 500,
                  cursor: 'pointer',
                }}
              >
                {isHighlighted && !isActive ? '● ' : ''}{t.label}
              </button>
            );
          })}
        </div>

        {tab === 'diferenciar'
          ? <DifferentiationTab />
          : <ResourceTab state={tab} />
        }
      </div>
    </main>
  );
}
