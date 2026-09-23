import { useState, useEffect } from 'react';
import { loadHistory, formatDate } from '../utils/storage.js';
import { STATE_META, STATES, THRESHOLD } from '../data/questions.js';
import { getActiveStates } from '../utils/scoring.js';
import { questions } from '../data/questions.js';

const PERIODS = [
  { label: 'Últimos 7 dias', days: 7 },
  { label: 'Últimos 30 dias', days: 30 },
  { label: 'Todo o histórico', days: null },
];

function filterByPeriod(history, days) {
  if (!days) return history;
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  return history.filter(e => new Date(e.timestamp).getTime() > cutoff);
}

function diffId(state) {
  return state === STATES.SENSORIAL ? 's6' : state === STATES.ANSIEDADE ? 'a6' : state === STATES.DEPRESSAO ? 'd6' : 'i6';
}

function buildPlainText(included, period, intro) {
  const lines = [
    'RELATÓRIO — BÚSSOLA INTERNA',
    '',
    'NOTA: Este relatório é gerado a partir de autoavaliações feitas pela própria pessoa, com base em sinais observáveis. Não constitui diagnóstico. É um apoio para a conversa com o profissional responsável.',
    '',
  ];
  if (intro) { lines.push('MENSAGEM:', intro, ''); }
  lines.push(`Período: ${period.label}`, `Total: ${included.length} avaliações`, '');

  const stateCounts = {};
  Object.values(STATES).forEach(s => {
    stateCounts[s] = included.filter(e => (e.scores?.[s] ?? 0) >= THRESHOLD).length;
  });
  lines.push('RESUMO:');
  Object.values(STATES).forEach(s => {
    lines.push(`  ${STATE_META[s].label}: presente em ${stateCounts[s]} de ${included.length} avaliações`);
  });
  lines.push('', 'DETALHAMENTO:');

  included.forEach(entry => {
    lines.push('---', formatDate(entry.timestamp));
    const active = getActiveStates(entry.scores ?? {});
    active.forEach(s => {
      lines.push(`  ${STATE_META[s].label}: ${entry.scores?.[s] ?? 0}/6`);
      questions.filter(q => q.state === s && entry.answers?.[q.id] === 'sim').forEach(q => {
        lines.push(`    • ${q.id === diffId(s) ? '[sinal diferenciador] ' : ''}${q.text}`);
      });
    });
    if (entry.note) lines.push(`  Nota: "${entry.note}"`);
  });
  return lines.join('\n');
}

export default function Report() {
  const [history, setHistory] = useState([]);
  const [periodIdx, setPeriodIdx] = useState(1);
  const [selected, setSelected] = useState({});
  const [intro, setIntro] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const h = loadHistory();
    setHistory(h);
    const sel = {};
    h.forEach(e => { sel[e.id] = true; });
    setSelected(sel);
  }, []);

  const period = PERIODS[periodIdx];
  const filtered = filterByPeriod(history, period.days);
  const included = filtered.filter(e => selected[e.id]);

  const stateCounts = {};
  Object.values(STATES).forEach(s => {
    stateCounts[s] = included.filter(e => (e.scores?.[s] ?? 0) >= THRESHOLD).length;
  });

  function toggleEntry(id) {
    setSelected(s => ({ ...s, [id]: !s[id] }));
  }

  function handlePrint() {
    setShowPreview(true);
    setTimeout(() => window.print(), 250);
  }

  function handleCopy() {
    navigator.clipboard.writeText(buildPlainText(included, period, intro))
      .then(() => alert('Texto copiado.'))
      .catch(() => alert('Não foi possível copiar automaticamente.'));
  }

  return (
    <main className="page" id="main-content">
      <div className="container">
        <h1 style={{ marginBottom: '0.35rem' }}>Relatório para o profissional</h1>
        <p className="small dimmed" style={{ marginBottom: '1.75rem' }}>
          Você decide o que incluir. O relatório é exportado direto do seu navegador — nada passa por servidor.
        </p>

        {history.length === 0 ? (
          <div className="card" style={{ textAlign: 'center' }}>
            <p>Nenhuma avaliação salva ainda.</p>
            <p className="small dimmed" style={{ marginTop: '0.5rem' }}>
              Complete e salve ao menos uma autoavaliação para gerar um relatório.
            </p>
          </div>
        ) : (
          <>
            {/* Period */}
            <div className="card" style={{ marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Período</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {PERIODS.map((p, i) => (
                  <button
                    key={i}
                    className={`btn btn-sm ${periodIdx === i ? 'btn-primary' : 'btn-ghost'}`}
                    aria-pressed={periodIdx === i}
                    onClick={() => { setPeriodIdx(i); setSelected({}); setShowPreview(false); }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Intro */}
            <div className="card" style={{ marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Mensagem (opcional)</h3>
              <textarea
                value={intro}
                onChange={e => setIntro(e.target.value)}
                placeholder="Algo que você quer comentar diretamente com o profissional…"
                aria-label="Mensagem opcional"
                style={{
                  width: '100%', minHeight: 72, padding: '0.75rem',
                  border: '2px solid var(--areia-dark)', borderRadius: 8,
                  fontFamily: 'var(--font-body)', fontSize: '0.95rem', resize: 'vertical',
                  color: 'var(--grafite)',
                }}
              />
            </div>

            {/* Entry selection */}
            <div className="card" style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <h3 style={{ fontSize: '1rem' }}>{filtered.length} avaliações neste período</h3>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button className="btn btn-ghost btn-sm" onClick={() => { const s = {}; filtered.forEach(e => { s[e.id] = true; }); setSelected(s); }}>Todas</button>
                  <button className="btn btn-ghost btn-sm" onClick={() => { const s = {}; filtered.forEach(e => { s[e.id] = false; }); setSelected(s); }}>Nenhuma</button>
                </div>
              </div>
              {filtered.length === 0 ? (
                <p className="small dimmed">Nenhuma avaliação neste período.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {filtered.map(entry => {
                    const active = getActiveStates(entry.scores ?? {});
                    const isChecked = !!selected[entry.id];
                    return (
                      <label key={entry.id} style={{
                        display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
                        padding: '0.75rem', borderRadius: 8,
                        border: '1px solid var(--areia-dark)', cursor: 'pointer',
                        background: isChecked ? 'var(--areia)' : 'var(--white)',
                      }}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleEntry(entry.id)}
                          aria-label={`Incluir avaliação de ${formatDate(entry.timestamp)}`}
                          style={{ marginTop: 3, flexShrink: 0 }}
                        />
                        <div>
                          <span className="small dimmed">{formatDate(entry.timestamp)}</span>
                          {active.length > 0 ? (
                            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem', flexWrap: 'wrap' }}>
                              {active.map(s => (
                                <span key={s} className="small" style={{ color: STATE_META[s].color, fontWeight: 700 }}>
                                  {STATE_META[s].label}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="small dimmed" style={{ display: 'block', marginTop: '0.2rem' }}>
                              Nenhum estado em evidência
                            </span>
                          )}
                        </div>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }} className="no-print">
              <button className="btn btn-secondary" disabled={included.length === 0} onClick={() => setShowPreview(v => !v)}>
                {showPreview ? 'Ocultar prévia' : 'Visualizar relatório'}
              </button>
              <button className="btn btn-primary" disabled={included.length === 0} onClick={handlePrint}>
                Exportar como PDF
              </button>
              <button className="btn btn-ghost" disabled={included.length === 0} onClick={handleCopy}>
                Copiar texto
              </button>
            </div>

            {included.length === 0 && (
              <p className="small dimmed" style={{ marginBottom: '1rem' }}>Selecione ao menos uma avaliação.</p>
            )}

            {/* Preview */}
            {showPreview && included.length > 0 && (
              <ReportPreview included={included} period={period} intro={intro} stateCounts={stateCounts} />
            )}
          </>
        )}
      </div>
    </main>
  );
}

function ReportPreview({ included, period, intro, stateCounts }) {
  return (
    <div className="report-preview">
      <h2 style={{ marginBottom: '0.25rem' }}>Bússola Interna — Relatório de Autoavaliação</h2>
      <p className="small dimmed" style={{ marginBottom: '1.25rem' }}>Gerado em {new Date().toLocaleString('pt-BR')}</p>

      <div style={{ background: '#f5f0e8', padding: '0.75rem 1rem', borderRadius: 6, marginBottom: '1.25rem' }}>
        <p className="small">
          <strong>Nota:</strong> Este relatório é gerado a partir de autoavaliações feitas pela própria pessoa, com base em sinais observáveis. Não constitui diagnóstico. É um apoio para a conversa com o profissional responsável.
        </p>
      </div>

      {intro && <><h3>Mensagem</h3><p style={{ marginBottom: '1.25rem', fontStyle: 'italic' }}>{intro}</p></>}

      <h3>Período e resumo</h3>
      <p><strong>Período:</strong> {period.label}</p>
      <p><strong>Total de avaliações:</strong> {included.length}</p>

      <table style={{ marginTop: '0.75rem', width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #e8e1d3' }}>
            <th style={{ textAlign: 'left', padding: '0.4rem 0.5rem' }}>Estado</th>
            <th style={{ textAlign: 'center', padding: '0.4rem 0.5rem' }}>Presente em</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(STATES).map(s => (
            <tr key={s} style={{ borderBottom: '1px solid #e8e1d3' }}>
              <td style={{ padding: '0.4rem 0.5rem' }}>{STATE_META[s].label}</td>
              <td style={{ textAlign: 'center', padding: '0.4rem 0.5rem', fontWeight: 700 }}>
                {stateCounts[s]} de {included.length} avaliações
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: '1.5rem' }}>Detalhamento</h3>
      {included.map(entry => {
        const active = getActiveStates(entry.scores ?? {});
        return (
          <div key={entry.id} className="report-entry">
            <p><strong>{formatDate(entry.timestamp)}</strong></p>
            {active.length === 0 && <p className="small dimmed">Nenhum estado em evidência.</p>}
            {active.map(s => {
              const did = diffId(s);
              const yesItems = questions.filter(q => q.state === s && entry.answers?.[q.id] === 'sim');
              return (
                <div key={s} style={{ marginTop: '0.6rem', marginLeft: '0.5rem' }}>
                  <p style={{ fontWeight: 700, color: STATE_META[s].color }}>
                    {STATE_META[s].label}
                  </p>
                  <ul style={{ marginTop: '0.3rem', paddingLeft: '1.25rem', fontSize: '0.9rem' }}>
                    {yesItems.map(q => (
                      <li key={q.id} style={{ marginBottom: '0.2rem' }}>
                        {q.id === did && <strong>[sinal diferenciador] </strong>}
                        {q.text}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
            {entry.note && <p className="small" style={{ marginTop: '0.6rem', fontStyle: 'italic' }}>Nota: "{entry.note}"</p>}
          </div>
        );
      })}
    </div>
  );
}
