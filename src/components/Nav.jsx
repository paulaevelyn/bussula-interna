import { useState } from 'react';
import CrisisOverlay from './CrisisOverlay.jsx';

const NAV_ITEMS = [
  { id: 'home', label: 'Início' },
  { id: 'resources', label: 'Recursos' },
  { id: 'history', label: 'Histórico' },
  { id: 'report', label: 'Relatório' },
];

export default function Nav({ page, onNavigate }) {
  const [showCrisis, setShowCrisis] = useState(false);

  return (
    <>
      <div className="crisis-bar" role="complementary" aria-label="Apoio em crise">
        <span>Precisa de apoio agora? </span>
        <button onClick={() => setShowCrisis(true)}>Clique aqui — CVV 188</button>
      </div>

      <nav className="nav" aria-label="Navegação principal">
        <div className="nav-inner">
          <button className="nav-logo" onClick={() => onNavigate('home')} aria-label="Bússola Interna — ir para o início">
            Bússola Interna
          </button>
          <div className="nav-links" role="list">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                role="listitem"
                className={`nav-link${page === item.id ? ' active' : ''}`}
                onClick={() => onNavigate(item.id)}
                aria-current={page === item.id ? 'page' : undefined}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {showCrisis && <CrisisOverlay onClose={() => setShowCrisis(false)} />}
    </>
  );
}
