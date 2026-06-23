import { useEffect } from 'react';

export default function CrisisOverlay({ onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="overlay-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="crisis-title"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="overlay-box">
        <h2 id="crisis-title">Precisa de apoio agora?</h2>

        <p>Se você estiver em sofrimento intenso ou pensando em se machucar, fale com alguém agora:</p>

        <p>
          <strong>CVV — Centro de Valorização da Vida</strong>
          <span className="crisis-number">188</span>
          Ligação gratuita, 24 horas, 7 dias por semana.
          Você também pode acessar{' '}
          <a href="https://www.cvv.org.br" target="_blank" rel="noopener noreferrer">cvv.org.br</a>{' '}
          para atendimento por chat.
        </p>

        <p>
          <strong>CAPS ou UBS mais próxima</strong><br />
          Se você já acompanha algum serviço de saúde mental, entre em contato com eles.
          Em emergências, vá ao pronto-socorro mais próximo ou ligue <strong>192 (SAMU)</strong>.
        </p>

        <p className="small dimmed" style={{ marginTop: '1.25rem' }}>
          Este app não avalia risco de forma ativa e não substitui apoio profissional. Em caso de dúvida, busque ajuda humana.
        </p>

        <button
          className="btn btn-ghost btn-sm"
          style={{ marginTop: '1.25rem' }}
          onClick={onClose}
          autoFocus
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
